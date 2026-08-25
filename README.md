# WFRP4e Hidden Opposed Rolls

Roll your attacks in secret without taking your players' defence away.

In WFRP4e an attack is an opposed test, and the system splits it across two chat
cards: one holds your roll (the numbers), the other holds the target's *dodge /
parry / defend* buttons. The catch is that the button card copies the roll card's
visibility — so the moment you roll privately as GM, your players lose the buttons
too, and can't react. This module keeps your numbers hidden but sends the defend
buttons through to the targeted player anyway.

![GM sees the roll; the targeted player sees only the defend buttons](docs/hidden-opposed-rolls.png)
<!-- TODO screenshot: side-by-side of the GM chat log (roll + buttons) and the player's
     chat log (defend buttons, no numbers). Drop the image at docs/hidden-opposed-rolls.png. -->

## Features

- Your GM attack roll — SL, damage, hit location — stays hidden from players.
- The targeted player still gets their defend/response buttons and reacts as normal.
- Other players don't see the roll or someone else's defend prompt.
- One toggle. Turn it off and you're back to stock WFRP4e behaviour.

## Requirements

- Foundry VTT v13
- wfrp4e system v9.5.3+

No other module dependencies.

## Installation

Paste this manifest URL into Foundry's **Install Module → Manifest URL** box (at the
bottom of the Install Module window):

```
https://github.com/warhammering/wfrp4e-hidden-opposed-rolls/releases/latest/download/module.json
```

Then enable **WFRP4e Hidden Opposed Rolls** in **Manage Modules**. It updates itself
when a new release is tagged.

## Usage

Target a player's token and make your attack the way you always do — roll it
privately if you like. Your numbers stay with you; the targeted player gets their
defend buttons and rolls their reaction from their own sheet.

## Settings

| Setting | Default | What it does |
| --- | --- | --- |
| **Hide GM Opposed Rolls** | On | Hides your opposed roll from players while still delivering the defend buttons to the target. Turn it off for stock behaviour, where hiding the roll also hides the buttons. |

## Known issues

- Only rolls **you make as GM** are touched. Player-initiated attacks are left alone
  — this is deliberate, but worth knowing if you expected it to cover both.
- Only opposed rolls (rolls made against a target) are affected. Ordinary GM rolls
  with no target aren't hidden.
- The final result card (who won the exchange) keeps its normal visibility, so the
  player still learns the outcome.
- Tested against wfrp4e 9.6.3. It relies on the system's opposed-test chat structure;
  a future system release that reworks that structure could need an update.

## How it works

One `preCreateChatMessage` hook. When you make an opposed attack, it forces the roll
card to GM-only and re-routes the defend-button card to the targeted actor's owners.
No system files are patched.

## License

MIT © 2026 GMD
