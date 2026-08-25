# WFRP4e Hidden Opposed Rolls

Hide your **GM opposed rolls** from players — while the targeted player still gets
their **defend / response buttons**.

## The problem

In the WFRP4e system, an opposed test (an attack) is not one chat card. It is
three separate ones:

| Card | Holds |
| --- | --- |
| **Roll card** | your dice result — SL, damage, hit location |
| **Response card** | the *defend / dodge / parry* buttons the target clicks |
| **Result card** | who won the opposed test |

The defend buttons live on the **response card**, but the system copies the roll
card's visibility onto it. So the moment you roll your attack privately (GM roll
or blind roll), the response card goes GM-only too — and your player never sees
the buttons to defend.

## What this module does

While enabled, for an opposed roll **you make as the GM**:

1. Your **roll card is hidden from players** (the numbers stay secret).
2. The **response card is delivered to the targeted player**, so they still get
   their defend buttons and can react as normal.

The GM keeps seeing everything. Other players do not see the roll or another
player's response card.

Nothing else changes, and no system files are modified — the whole thing is a
single `preCreateChatMessage` hook. Turn the module off and you get stock WFRP4e
behaviour back (where hiding your roll also hides the buttons).

## Settings

| Setting | Default | Effect |
| --- | --- | --- |
| **Hide GM Opposed Rolls** | On | Master switch. On = hide your opposed rolls but keep the target's buttons. Off = vanilla behaviour. |

## Usage

1. Enable the module (and the setting, which is on by default).
2. Target a player's token and make your attack as you normally would — roll it
   privately if you like.
3. Your numbers stay hidden; the targeted player gets their defend buttons.

## Requirements

- Foundry VTT **v13**
- **WFRP4e** system (v9.5.3+)

No other module dependencies.

## Notes

- The module only reshapes rolls **the GM makes**. Player-initiated rolls are
  left completely untouched.
- Only opposed rolls (rolls made against a target) are affected. Ordinary GM
  rolls with no target are not hidden.
- The final **result card** (who won) is left at its normal visibility, so the
  player still learns the outcome of the exchange.

## License

MIT © 2026 GMD
