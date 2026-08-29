<h1 align="center">WFRP4e Hidden Opposed Rolls</h1>

<p align="center"><strong>The player should not see the beastman's roll. They should still get to parry it.</strong></p>

<p align="center">
  <a href="https://foundryvtt.com/"><img alt="Foundry VTT v13" src="https://img.shields.io/badge/Foundry_VTT-v13-5b2024?style=flat-square"></a>
  <a href="https://github.com/moo-man/WFRP4e-FoundryVTT"><img alt="WFRP4e system" src="https://img.shields.io/badge/System-WFRP4e-a98949?style=flat-square"></a>
  <a href="https://github.com/warhammering/wfrp4e-hidden-opposed-rolls/releases/latest"><img alt="Latest release" src="https://img.shields.io/github/v/release/warhammering/wfrp4e-hidden-opposed-rolls?style=flat-square&color=5b2024"></a>
  <a href="LICENSE"><img alt="MIT license" src="https://img.shields.io/badge/License-MIT-51473b?style=flat-square"></a>
</p>

<!-- Add a GIF here: a private GM attack beside the targeted player's visible Defend card. -->

There is a good reason to roll an ambush behind the screen. There is no good reason for the target
to lose the button that lets them defend themselves.

WFRP4e builds an opposed attack from separate chat cards. One carries the attack roll—the SL,
damage, and hit location—and another carries the target's response buttons. The second card inherits
the first card's visibility, so a private GM roll also hides the player's way to parry or dodge.

**WFRP4e Hidden Opposed Rolls** separates those two jobs. Your numbers stay behind the screen. The
targeted player still gets the response card.

> **Created and maintained by GMD.**

## Installation

1. From Foundry's **Setup** screen, open **Add-on Modules**.
2. Click **Install Module**.
3. Paste the manifest URL below into **Manifest URL**, then click **Install**.

```text
https://github.com/warhammering/wfrp4e-hidden-opposed-rolls/releases/latest/download/module.json
```

Launch your WFRP4e world, open **Manage Modules**, and enable **WFRP4e Hidden Opposed Rolls**.

### Compatibility

| Component | Requirement |
|---|---|
| Foundry Virtual Tabletop | **v13** |
| Game system | **WFRP4e v9.5.3+** |
| Mandatory add-on modules | None |
| Language | English |

## At the table

Target a player-owned token and roll the attack as GM. The module then handles the chat audience:

| Chat information | GM | Target's owners | Other players |
|---|:---:|:---:|:---:|
| Attacker's test card and numbers | Yes | No | No |
| Defend/response card | Yes | Yes | No |

The player rolls their defence from the normal WFRP4e response card. The module does not replace the
opposed-test workflow or calculate a different result.

## Setting

Open **Configure Settings → Module Settings**.

| Setting | Default | What it does |
|---|---:|---|
| **Hide GM Opposed Rolls** | On | Hides GM-created opposed test cards while sending the response card to the targeted actor's owners. Turn it off to restore stock WFRP4e chat visibility. |

The setting is world-wide. It affects new opposed rolls; it does not rewrite cards already in chat.

## Boundaries worth knowing

- Only GM-created opposed tests with a target are changed. Ordinary GM tests and player-made rolls
  are left alone.
- A player must have **Owner** permission on the targeted actor to receive the response card.
- If several non-GM users own that actor, each owner receives the card.
- The module controls chat visibility. It does not hide canvas movement, token targeting, sound,
  animation, or any other clue that an attack happened.

## Troubleshooting

### The player did not receive the Defend card

Check that the player's user has **Owner** permission on the targeted actor, not only Observer. Make
sure you targeted that token before rolling the attack.

### Everyone can see the attack roll

Open **Configure Settings → Module Settings** and turn on **Hide GM Opposed Rolls**. Reload the world
if the module was enabled during the current session.

### An old chat card did not change

That is expected. The module sets visibility when WFRP4e creates the message; it does not edit chat
history.

## Support

- Download the [latest release](https://github.com/warhammering/wfrp4e-hidden-opposed-rolls/releases/latest).
- Report reproducible problems through [GitHub Issues](https://github.com/warhammering/wfrp4e-hidden-opposed-rolls/issues).

Include the ownership level of the targeted actor and whether the missing card was the test,
response, or final opposed-result card.

## Credits

**GMD — design, development, and maintenance**

## License and disclaimer

The source is released under the [MIT License](LICENSE).

This is an independent, unofficial module for Foundry Virtual Tabletop and WFRP4e. It is not
affiliated with or endorsed by Foundry Gaming LLC, Games Workshop, or Cubicle 7. Warhammer Fantasy
Roleplay and related names and marks belong to their respective owners.
