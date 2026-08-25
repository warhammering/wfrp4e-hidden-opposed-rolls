/**
 * WFRP4e Hidden Opposed Rolls
 * -----------------------------------------------------------------------------
 * WFRP4e resolves an opposed test as THREE separate chat messages:
 *   - type "test"    -> the attacker's roll card (the numbers: SL, damage, etc.)
 *   - type "handler" -> the "respond / defend" card that carries the buttons
 *   - type "opposed" -> the final resolved result card
 *
 * The response buttons live on the "handler" card, not on the roll card. But the
 * system copies the roll card's `whisper`/`blind` onto the handler card
 * (OpposedHandler#setAttacker). So when a GM rolls their attack privately, the
 * button card inherits "GM only" too and the targeted player never sees the
 * buttons.
 *
 * This module keeps those two concerns separate. While enabled, for a GM-made
 * opposed attack it:
 *   1. forces the attacker's roll card to GM-only (hides the numbers), and
 *   2. re-routes the handler (button) card to the targeted actor's owners,
 *      persisting that on the handler's own options so a later re-render (after
 *      the defender rolls) keeps the card visible.
 *
 * No system files are touched; everything happens in a single
 * preCreateChatMessage hook. Turn the module off to get pure vanilla behaviour.
 */

const MODULE = "wfrp4e-hidden-opposed-rolls";
const OWNER = CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;

Hooks.once("init", () => {
    game.settings.register(MODULE, "enabled", {
        name: `${MODULE}.SettingEnabledName`,
        hint: `${MODULE}.SettingEnabledHint`,
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });
});

/** IDs of every GM user. */
function gmIds() {
    return game.users.filter(u => u.isGM).map(u => u.id);
}

/**
 * Non-GM user IDs who own the targeted defender, resolved from the handler's
 * stored targetSpeakerData ({ scene, token, actor }).
 */
function playerOwnersOfTarget(targetSpeakerData) {
    if (!targetSpeakerData) return [];

    let actor = null;
    const { scene, token, actor: actorId } = targetSpeakerData;
    if (scene && token) actor = game.scenes.get(scene)?.tokens.get(token)?.actor ?? null;
    if (!actor && actorId) actor = game.actors.get(actorId) ?? null;
    if (!actor) return [];

    const ownership = actor.ownership ?? {};
    const defaultLevel = ownership.default ?? 0;
    const ids = new Set();
    for (const u of game.users) {
        if (u.isGM) continue;
        const level = ownership[u.id] ?? defaultLevel;
        if (level >= OWNER) ids.add(u.id);
    }
    return [...ids];
}

Hooks.on("preCreateChatMessage", (document, data) => {
    try {
        if (!game.settings.get(MODULE, "enabled")) return;
        // Only reshape messages the GM themselves is creating (their attack).
        // Player-initiated rolls are left untouched.
        if (!game.user.isGM) return;

        const type = document.type ?? data?.type;
        const gms = gmIds();

        if (type === "test") {
            // Hide the GM's opposed roll card (the numbers) from players. Only
            // opposed tests carry targets; ordinary GM rolls are left alone.
            const targets = document.system?.testData?.context?.targets
                ?? data?.system?.testData?.context?.targets
                ?? [];
            if (Array.isArray(targets) && targets.length) {
                document.updateSource({ whisper: gms, blind: false });
            }
            return;
        }

        if (type === "handler") {
            // Deliver the defend/response buttons to the targeted player while
            // keeping the card visible to the GM.
            const opp = foundry.utils.deepClone(
                document.system?.opposedData ?? data?.system?.opposedData ?? null
            );
            if (!opp) return;

            const owners = playerOwnersOfTarget(opp.targetSpeakerData);
            const whisper = [...new Set([...gms, ...owners])];

            // Persist onto the handler's own options too. When the defender later
            // rolls, the system re-renders this card from these stored options; if
            // we only patched the top-level whisper it would revert to GM-only.
            opp.options = { whisper, blind: false };

            document.updateSource({
                whisper,
                blind: false,
                system: { opposedData: opp }
            });
        }
    } catch (e) {
        console.error(`${MODULE} | preCreateChatMessage failed`, e);
    }
});
