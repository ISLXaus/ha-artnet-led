[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)

# DMX Lighting for Home Assistant

Control DMX lighting from Home Assistant over **Art-Net**, **sACN (E1.31)** and **KiNet**. Fixtures are patched in a visual **DMX Patch** panel in the sidebar and show up as ordinary Home Assistant lights: dimmers, RGB/RGBW/RGBWW, tunable white, XY and on/off, at 8, 16, 24 or 32 bits per channel.

Output is one-way: Home Assistant sends DMX to your nodes. Output uses [pyartnet](https://github.com/spacemanspiff2007/PyArtNet).

## Installation

> **Note**
>
> This integration requires [HACS](https://hacs.xyz/docs/setup/download/) to be installed.

1. Open HACS
2. Open the options in the top right and select _Custom repositories_
3. Enter this repository's URL (`https://github.com/ISLXaus/ha-artnet-led`) under the Category _Integration_.
4. Press _Add_
5. _+ EXPLORE & DOWNLOAD REPOSITORIES_
6. Find _DMX Lighting (Art-Net, sACN, KiNet)_ in this list
7. _DOWNLOAD THIS REPOSITORY WITH HACS_
8. _DOWNLOAD_
9. Restart Home Assistant (_Settings_ > _System_ > _RESTART_)
10. Add the integration: _Settings_ > _Devices & Services_ > _+ ADD INTEGRATION_ > _DMX Lighting_ — or click:

    [![Add integration](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=dmx_lighting)

    This one click creates the *DMX Patch* entry and puts the **DMX Patch** panel in the sidebar. (Home Assistant doesn't load a custom integration until it's added, so the panel can't appear from the download alone.)

### Upgrading from v0.2.x (`artnet_led`)

Up to v0.2.x this integration was called *DMX Artnet integration* and used the domain `artnet_led`. v0.3.0 renames it to *DMX Lighting* (`dmx_lighting`). Your patch and lights move over automatically:

1. Update the repository in HACS and restart Home Assistant.
2. If a `custom_components/artnet_led` folder is still there, delete it (or remove the old download in HACS) and restart again.
3. Add the integration (installation step 10).

On that first setup DMX Lighting copies the patch from `.storage/artnet_led.patch`, moves every `artnet_led` light to the new integration with the **same entity ID** (so history, dashboards and automations keep working), and removes the old *DMX Patch* entry.

Also note:

* **YAML configuration (`light: - platform: artnet_led`) is no longer supported.** Remove it from `configuration.yaml`, then recreate those nodes in the panel. To do that by text, write them in the panel's YAML format (see [Backup / edit as YAML](#backup--edit-as-yaml)) and use *Load into editor*. As long as a light keeps its host, universe and channel, it keeps its entity and history.
* **Art-Net controller mode (`artnet-controller`) has been removed.** Use `artnet-direct` to each node instead. A stored node of that type is flagged in the panel and skipped until you change it.

## DMX Patch panel

The **DMX Patch** panel in the Home Assistant sidebar (admin users only) is where everything is configured:

* **Nodes**: add Art-Net, sACN or KiNet nodes with all their options (see [Node options](#node-options)).
* **Universes**: a 512-channel grid per universe. Click an empty channel to place a fixture, click a fixture to edit or delete it, drag it to re-address it. Channel overlaps are highlighted and rejected on save.
* **Entity shortcut**: the fixture editor shows the light entity a saved fixture already has, with its state, and *Open entity* opens Home Assistant's entity dialog (controls, history, settings) without losing your edits. Entity ids in the fixture list are links to the same dialog.
* **Fixture list**: switch a node from *Grid* to *List* to see all its fixtures across every universe in one table — name, entity, type, address (universe and channel range) and channel layout, with dummy channels shown by label and value. An *Output* tile at the end of each row shows the light's current colour, filled to its brightness with the percentage on it, and updates live as the light changes (it reflects the light entity's state). Filter by name, type, entity or label, sort by name, type or address, and click a fixture to edit it. Fixtures with overlaps or validation errors are highlighted, and a dot shows whether each light is on. *Add fixture* places a new one at the first free channel of the selected universe. The panel remembers which view you used last.
* **Live apply**: *Save & Apply* takes effect immediately — no Home Assistant restart. Entities keep their identity across saves (unique IDs are derived from `host/universe/channel`, so moving a fixture to another channel creates a new entity).
* **Live DMX values**: toggle *Live DMX values* on any universe to watch the actual channel values update in real time (10 Hz).

The patch is stored in `.storage/dmx_lighting.patch`.

### Custom fixtures and dummy channels

Many fixtures have channels that aren't part of the light itself — a *mode*, *strobe*, *macro* or *fan* channel that has to sit at a particular value for the fixture to work. In the fixture dialog, tick **Custom channel layout** to build the fixture channel by channel:

* **Light channels** (dimmer, red, green, blue, white, cool/warm white, color temp, hue, saturation, X/Y — whatever the fixture type supports) follow the light entity.
* **Dummy channels** have an optional **label** (e.g. `Mode`, `Strobe`, up to 32 characters) and a **fixed value** from 0 to 255. That value is sent from the moment the patch is applied and held there — while the light is off, while it fades, and while its color or brightness changes. With 16-bit (or wider) channel sizes the value is the coarse byte, like the other channels.

Use ↑/↓ to put channels in the fixture's order and ✕ to remove one. The type still decides what kind of light entity you get (e.g. `rgb` with a Mode channel is an RGB light); a `dimmer` can also have dummy channels, and a `fixed` fixture is made only of dummy channels. `binary` fixtures are always a single channel.

In the universe grid dummy channels are hatched and show their label and value. They count towards the fixture's footprint, so overlaps and the 512-channel limit include them. Validation (server-side, on save and import) checks that values are whole numbers 0–255, that each light channel fits the type, and that labels are text.

In the patch (and its YAML export) a custom layout is the regular [`channel_setup`](#channel-layout-channel_setup) list — numbers are dummy channels — plus a panel-only `channel_labels` list in the same order (`null` for unlabeled channels):

```yaml
- channel: 1
  name: wash_1
  type: rgb
  channel_setup: [d, r, g, b, 42, 200]
  channel_labels: [null, null, null, null, Mode, Strobe]
```

`channel_labels` is only used by the panel.

### Backup / edit as YAML

The **YAML** button in the panel header opens the whole patch as YAML text: copy or download it as a backup, or paste/load an edited version and press *Load into editor*. Imports are parsed and validated server-side (JSON works too), loaded as unsaved changes for review, and only take effect once you *Save & Apply*.


## Patch reference

These are the options in the panel's dialogs, under the same names as in the YAML export. A complete patch looks like this:

```yaml
nodes:
  - node_type: artnet-direct
    host: 192.168.1.50
    max_fps: 25
    refresh_every: 120
    universes:
      "0":
        send_partial_universe: true
        output_correction: quadratic
        devices:
          - channel: 1
            name: my_dimmer
            type: dimmer
            transition: 1
            channel_size: 16bit
          - channel: 3
            name: my_rgb_lamp
            type: rgb
            channel_setup: rbgw          # auto-calculated white channel
          - channel: 125
            name: my_color_temp_lamp
            type: color_temp
            min_temp: 2500K
            max_temp: 6500K
            channel_setup: ch
```

### Node options

- **node_type** (default `artnet-direct`): the protocol
  - `artnet-direct`: Art-Net, sent directly to the node's IP.
  - `sacn`: E1.31 sACN, unicast to the node's IP or multicast (see `multicast`). Universes start at 1.
  - `kinet`: KiNet, sent directly to the node's IP.
- **host** (required): IP address of the node.
- **port** (default 6454 for Art-Net, 5568 for sACN, 6038 for KiNet): only change this if you're sure your node uses another port.
- **max_fps** (default 25): frame rate for fades (1 to 50).
- **refresh_every** (default 120): seconds between resends when nothing is fading; 0 disables.
- **transition** (optional, default 0): default fade time in seconds for the node's fixtures that don't set their own. A fixture's own transition — including `0` — always wins. In the node settings, *Make all use this default* clears the fixture-level values so every fixture on the node follows it.
- **priority** (default 100; sACN only): E1.31 priority (0-200). Receivers merge multiple sources by priority; higher wins.
- **multicast** (default off; sACN only): send each universe to its standard `239.255.x.x` multicast group instead of unicast to `host`. Most sACN receivers and viewer apps expect this; with unicast, viewer apps on other machines won't see the output. When enabled, `host` is only used as an identifier. Home Assistant also announces its universes with E1.31 Universe Discovery so tools like sACNView list it as a source.

### Universe options

- **send_partial_universe** (default on): only send channels up to the last one in use. Some nodes only accept full DMX frames; turn this off to always send all 512 channels.
- **output_correction** (default `linear`): dimming curve for the whole universe: `linear`, `quadratic`, `cubic` or `quadruple` (see [Output correction](#output-correction)).

### Fixture options

- **channel** (required): first DMX channel (1-512).
- **name** (required): name of the light; the entity becomes `light.<name>`.
- **type** (default `dimmer`):
  - `fixed`: dummy channels only, with fixed values
  - `binary`: single on/off channel
  - `dimmer`: single channel
  - `rgb`: red, green, blue
  - `rgbw`: red, green, blue, white
  - `rgbww`: red, green, blue, cool white, warm white
  - `color_temp`: cool white, warm white
  - `xy`: dimmer plus X/Y color
- **transition** (optional): fade time in seconds. Leave it blank to use the node's default transition; any value, including `0`, overrides the node default. A transition sent from Home Assistant (e.g. in `light.turn_on`) overrides both. The fixture list shows each fixture's fade time, marked *own* when it overrides the node.
- **output_correction**: dimming curve for this fixture; overrides the universe setting.
- **channel_size** (default `8bit`): `8bit` (256 steps), `16bit` (65k steps), `24bit` or `32bit`.
- **byte_order** (default `big`): byte order of multi-byte channels, `big` or `little`.
- **min_temp** / **max_temp** (default `2700K` / `6500K`): color temperature range for `color_temp` and `rgbww`.
- **channel_setup**: the fixture's channel layout (see below).

### Channel layout (`channel_setup`)

A string or list to customize the channel layout of your light.
If a list is provided, fixed numeric values may be included.

#### Examples

```yaml
channel_setup: Wrgb
```
_White unscaled, red, green, blue_

```yaml
channel_setup:
  - W
  - r
  - g
  - b 
```
_Same as above_

```yaml
channel_setup:
  - W
  - r
  - 128
  - b 
```
_Staticly sets the green channel on 50% brightness_



#### Definition

- `d` = dimmer (brightness 0 to 255)
- `c` = cool white value, scaled for brightness
- `C` = cool white value, unscaled
- `h` = warm white value, scaled for brightness
- `H` = warm white value, unscaled
- `t` = temperature (0 = warm, 255 = cold)
- `T` = temperature (255 = warm, 0 = cold)
- `r` = red, scaled for brightness
- `R` = red, unscaled
- `g` = green, scaled for brightness
- `G` = green unscaled
- `b` = blue, scaled for brightness
- `B` = blue, unscaled
- `w` = white, scaled for brightness
- `W` = white, unscaled
- `u` = hue
- `U` = saturation
- `x` = X value in XY color mode
- `y` = Y value in XY color mode
- [`0`, `255`] = static value between the range [0, 255] (a "dummy" channel, e.g. a fixture's mode or strobe channel; it keeps this value while the light is off, too)


#### Compatibility

| Type       |     |     |     |     |     |     |     |     |     |     |     |     |     |       |       |     |     |           |     |     | Default value |
|------------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-------|-------|-----|-----|-----------|-----|-----|---------------|
| fixed      |     |     |     |     |     |     |     |     |     |     |     |     |     |       |       |     |     | `[0,255]` |     |     | `[255]`       |
| binary     |     |     |     |     |     |     |     |     |     |     |     |     |     |       |       |     |     |           |     |     | (1 channel)   |
| dimmer     | `d` |     |     |     |     |     |     |     |     |     |     |     |     |       |       |     |     | `[0,255]` |     |     | `d`           |
| color_temp | `d` | `c` | `C` | `h` | `H` | `t` | `T` |     |     |     |     |     |     |       |       |     |     | `[0,255]` |     |     | `ch`          |
| rgb        | `d` |     |     |     |     |     |     | `r` | `R` | `g` | `G` | `b` | `B` | `w`\* | `W`\* | `u` | `U` | `[0,255]` |     |     | `rgb`         |
| rgbw       | `d` |     |     |     |     |     |     | `r` | `R` | `g` | `G` | `b` | `B` | `w`   | `W`   | `u` | `U` | `[0,255]` |     |     | `rgbw`        |
| rgbww      | `d` | `c` | `C` | `h` | `H` | `t` | `T` | `r` | `R` | `g` | `G` | `b` | `B` |       |       | `u` | `U` | `[0,255]` |     |     | `rgbch`       |
| xy         | `d` |     |     |     |     |     |     |     |     |     |     |     |     |       |       |     |     | `[0,255]` | `x` | `y` | `dxy`         |

\* In the case of a white channel being used in an RGB light fixture, the white channel is automatically calculated.



## Features

- **Color modes**: full independent control over RGB color, RGB brightness and cool/warm white, with a separate overall brightness. Set color and white levels independently, then dim the whole light without changing its color.
- **16-bit output**: combined with the separate brightness control, lights can dim to very low levels and still fade smoothly thanks to the 65k steps of 16 bit.
- **Transitions**: fade to a color or value with a transition time from Home Assistant.
- **Color temperature**: tune the white temperature of dual-channel warm/cool white fixtures.

### Output correction

Quadratic or cubic correction gives much smoother, more natural fades on LED strips. From left to right: linear (default), quadratic, cubic, quadruple.

<img src='curves.svg'>

## Tips

- The DMX King eDMX4 Pro doesn't seem to work when it receives fewer than 16 channels. Work around this by turning off *send partial universe*, or by placing a fixture at channel 16 or higher.
- DMX setups can create many frequently-changing entities, which Home Assistant records by default. This can bloat the database, especially with pixel strips where one strip is dozens of lights. Use names that share a prefix (e.g. `pixelstrip_1_pixel_1`) and exclude them from the recorder:

    ```yaml
    recorder:
      exclude:
        entity_globs:
          - light.pixelstrip*
    ```

- To enable debug logging:

    ```yaml
    logger:
      logs:
        custom_components.dmx_lighting: debug
    ```

### Tested hardware

- Should work with any Art-Net, KiNet or E1.31 sACN DMX interface.
- Art-Net: DMX King eDMX4, ENTTEC DIN Ethergate 2.
- sACN: esPixelStick, Falcon F16v2.

## Credits

This project began as a fork of [Breina/ha-artnet-led](https://github.com/Breina/ha-artnet-led), which in turn built on work by [corb3000](https://github.com/corb3000), [jnimmo](https://github.com/jnimmo/hass-dmx) and [spacemanspiff2007](https://github.com/spacemanspiff2007/home-assistant-artnet). Thanks to everyone who contributed.

## Legal

Art-Net™ Designed by and Copyright Artistic Licence Holdings Ltd.
