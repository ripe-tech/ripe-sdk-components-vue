# Documentation - Overview

## Configurator

The configurator component provides an interactive configuration experience inside a DOM. The user can interact with a model by rotating, highlighting and selecting it.

The configurator can receive the following parameters:

| Prop            | Type      | Required | Description                                                                                                                                    |
| --------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| brand           | `String`  | `false`  | The brand of the model.                                                                                                                        |
| model           | `String`  | `false`  | The name of the model.                                                                                                                         |
| version         | `Number`  | `false`  | The version of the build.                                                                                                                      |
| config          | `Boolean` | `false`  | Indicates that the component should apply the config internally on component initialization.                                                   |
| currency        | `String`  | `false`  | The `ISO 4217` currency code being used for the price of the model.                                                                            |
| parts           | `Object`  | `false`  | The model's customization.                                                                                                                     |
| initials        | `String`  | `false`  | The initials value to be used in the RIPE instance.                                                                                            |
| engraving       | `String`  | `false`  | The engraving value to be used in the RIPE instance.                                                                                           |
| initialsExtra   | `Object`  | `false`  | The set of (initials, engraving) per initials group to be used in the RIPE instance.                                                           |
| structure       | `Object`  | `false`  | The normalized structure that uniquely represents the configuration "situation".                                                               |
| frame           | `String`  | `false`  | The name of the frame to be shown in the configurator. For example, frame `1` on `side` would be `side-1`, and a `top` frame would be `top-1`. |
| size            | `Number`  | `false`  | The size (in pixels) of the configurator. If not defined, the configurator will use all the screen space available.                            |
| loader          | `Boolean` | `false`  | If the loader indicator should be shown whenever a configurator related loading operation is being performed. Defaults to `true`.              |
| selectedPart    | `String`  | `false`  | Part of the model that is currently selected (eg: side).                                                                                       |
| highlightedPart | `String`  | `false`  | Part of the model that is currently highlighted (eg: side). Only possible if the usage of masks is enabled.                                    |
| sensitivity     | `Number`  | `false`  | Configurator rotation sensitivity to the user mouse drag action. The sensitivity increases with the number value. Defaults to `40`.            |
| useMasks        | `Boolean` | `false`  | Usage of masks in the current model, necessary for the part highlighting action. Defaults to `true`.                                           |
| duration        | `Number`  | `false`  | The duration in milliseconds that the configurator frame transition should take. Defaults to `500`.                                            |
| animation       | `String`  | `false`  | The configurator animation style: `simple` (fade in), `cross` (crossfade) or `null`. Defaults to `null`.                                       |
| format          | `String`  | `false`  | The format of the configurator image (eg: png, jpg, svg, etc.). Defaults to 'png'.                                                             |
| ripe            | `Number`  | `false`  | Instance of RIPE SDK initialized, if not defined, the global RIPE SDK instance will be used.                                                   |

An example of an instantiation and the correspondent view:

```html
<ripe-configurator
    v-bind:brand="'dummy'"
    v-bind:model="'cube'"
    v-bind:version="52"
    v-bind:size="1000"
    v-bind:loader="true"
/>
```

![Configurator Example](/res/images/configurator.gif)

The frame can be controlled externally to the component, by changing the prop `frame`:

```html
<ripe-configurator
    v-bind:brand="'dummy'"
    v-bind:model="'cube'"
    v-bind:version="52"
    v-bind:size="1000"
    v-bind:frame="'top-0'"
/>
```

![Configurator with Frame Example](/res/images/configurator-frame.gif)

The customization of the model can also be provided, with the prop `parts`:

```html
<ripe-configurator
    v-bind:brand="'dummy'"
    v-bind:model="'cube'"
    v-bind:version="52"
    v-bind:size="1000"
    v-bind:frame="'side-4'"
    v-bind:parts="{
        side: {
            color: 'blue',
            material: 'leather_cbe',
            face: 'side'
        },
        shadow: {
            color: 'default',
            hidden: true,
            material: 'default'
        },
        top0_bottom: {
            color: 'red',
            face: 'side',
            material: 'leather_cbe'
        }
    }"
/>
```

![Configurator with Parts Example](/res/images/configurator-parts.gif)

The sensitivity, duration and other configurator attributes when first building the component. This attributes in addition to brand, model and version can later be changed, causing the configurator to load again.
It is also possible to define the highlighted part of the configurator, which will use masks to identify it. However, this highlighted part will only show after the first build of the configurator.

```html
<ripe-configurator
    v-bind:brand="'dummy'"
    v-bind:model="'cube'"
    v-bind:version="52"
    v-bind:size="1000"
    v-bind:frame="'side-4'"
    v-bind:loader="true"
    v-bind:selected-part="'side'"
    v-bind:highlighted-part="'side'"
    v-bind:sensitivity="100"
    v-bind:use-masks="true"
    v-bind:duration="1000"
    v-bind:animation="'cross'"
    v-bind:format="'png'"
/>
```

![Configurator with Increased Sensitivity](/res/images/configurator-sensitivity.gif)

There can be more than one configurator using the same instance of RIPE SDK:

```html
<ripe-configurator
    v-bind:brand="'dummy'"
    v-bind:model="'cube'"
    v-bind:version="52"
    v-bind:size="500"
    v-bind:ripe="ripe"
/>
<ripe-configurator
    v-bind:brand="'dummy'"
    v-bind:model="'cube'"
    v-bind:version="52"
    v-bind:size="500"
    v-bind:frame="'side-10'"
    v-bind:ripe="ripe"
/>
```

Which uses a RIPE SDK instance that can be initialized like this:

```javascript
this.ripe = new Ripe();
await this.ripe.config("dummy", "cube", {
    version: 52
});
```

![Multiple Configurators](/res/images/configurator-multiple.gif)

## Image

The image component `<ripe-image>` allows for the visualization of a given model.

The image can receive the following parameters:

| Prop                  | Type               | Required | Description                                                                                                                                                                                                                                                                                                                           |
| --------------------- | ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| brand                 | `String`           | `false`  | The brand of the model.                                                                                                                                                                                                                                                                                                               |
| model                 | `String`           | `false`  | The name of the model.                                                                                                                                                                                                                                                                                                                |
| version               | `Number`           | `false`  | The version of the build.                                                                                                                                                                                                                                                                                                             |
| config                | `Boolean`          | `false`  | Indicates that the component should apply the config internally on component initialization.                                                                                                                                                                                                                                          |
| currency              | `String`           | `false`  | The `ISO 4217` currency code being used for the price of the model.                                                                                                                                                                                                                                                                   |
| parts                 | `Object`           | `false`  | The model's customization.                                                                                                                                                                                                                                                                                                            |
| initials              | `String`           | `false`  | The initials value to be used in the RIPE instance.                                                                                                                                                                                                                                                                                   |
| engraving             | `String`           | `false`  | The engraving value to be used in the RIPE instance.                                                                                                                                                                                                                                                                                  |
| initialsExtra         | `Object`           | `false`  | The set of (initials, engraving) per initials group to be used in the RIPE instance.                                                                                                                                                                                                                                                  |
| structure             | `Object`           | `false`  | The normalized structure that uniquely represents the configuration "situation".                                                                                                                                                                                                                                                      |
| frame                 | `String`           | `false`  | The name of the frame to be shown in the configurator. For example, frame `1` on `side` would be `side-1`, and a `top` frame would be `top-1`.                                                                                                                                                                                        |
| size                  | `Number`           | `false`  | The size (in pixels) of the configurator. If not defined, the configurator will use all the screen space available.                                                                                                                                                                                                                   |
| format                | `String`           | `false`  | The format of the image, (eg: png, jpg, svg, etc.). Defaults to 'png'.                                                                                                                                                                                                                                                                |
| crop                  | `Boolean`          | `false`  | Indicates that the image composition is to be cropped. Crops the current image according to the minimal possible bounding box in both x and y axis.                                                                                                                                                                                   |
| showInitials          | `Boolean`          | `false`  | Indicates if the personalization should be shown. Defaults to `false`.                                                                                                                                                                                                                                                                |
| initialsGroup         | `String`           | `false`  | The group in which the image initials belongs to.                                                                                                                                                                                                                                                                                     |
| initialsBuilder       | `Function`         | `false`  | A function that receives the initials and engraving as strings and the img element that will be used and returns a map with the initials and a profile list.                                                                                                                                                                          |
| rotation              | `Number`           | `false`  | The angle in degrees of the rotation to apply on the model.                                                                                                                                                                                                                                                                           |
| flip                  | `Boolean`          | `false`  | If set flips the current image vertically, this operation is going to be performed before rotation.                                                                                                                                                                                                                                   |
| mirror                | `Boolean`          | `false`  | If set mirrors the current image horizontally, this operation is going to be performed before rotation.                                                                                                                                                                                                                               |
| boundingBox           | `Array`            | `false`  | Tuple that defines the target width and height (only one dimension is required) for the "inside" image to be generated, note that if both dimensions are defined image deformation may occur. Example: [100, 100].                                                                                                                    |
| algorithm             | `String`           | `false`  | The name of the blending algorithm that is going to be used in the blending of the multiple part layers.                                                                                                                                                                                                                              |
| background            | `String`           | `false`  | String that defines the color to be applied to the background in the `RRGGBB` hexadecimal format. Example: `ffffff`.                                                                                                                                                                                                                  |
| engine                | `String`           | `false`  | The name of the engine that is going to be used for the composition of the image (eg: base, rust, etc.), if not provided the best available is going to be used for the composition process.                                                                                                                                          |
| initialsX             | `Number`           | `false`  | Overrides the profiles position on the x axis.                                                                                                                                                                                                                                                                                        |
| initialsY             | `Number`           | `false`  | Overrides the profiles position on the y axis.                                                                                                                                                                                                                                                                                        |
| initialsWidth         | `Number`           | `false`  | Overrides the profiles width.                                                                                                                                                                                                                                                                                                         |
| initialsHeight        | `Number`           | `false`  | Overrides the profiles height.                                                                                                                                                                                                                                                                                                        |
| initialsViewport      | `Array`            | `false`  | Overrides the profiles viewport. Viewport is a window (specified by `[x, y, width, height]`) that defines a region to be shown with a zoom. It is used to showcase the initials.                                                                                                                                                      |
| initialsColor         | `String`           | `false`  | Overrides the profiles color to be applied to the initials.                                                                                                                                                                                                                                                                           |
| initialsOpacity       | `Number`           | `false`  | Overrides the profiles opacity to be applied to the initials. This value ranges from `0` to `1`.                                                                                                                                                                                                                                      |
| initialsAlign         | `String`           | `false`  | Overrides the profiles orientation of the initials to be applied. This field can be `left`, `right` or `center`.                                                                                                                                                                                                                      |
| initialsVertical      | `String`           | `false`  | Overrides the profiles vertical alignment on the initials. This field can be top, bottom or middle.                                                                                                                                                                                                                                   |
| initialsEmbossing     | `String`           | `false`  | Overrides the profiles embossing type of the initials. The available options vary with each model.                                                                                                                                                                                                                                    |
| initialsRotation      | `Number`           | `false`  | Overrides the profiles rotation angle, in degrees, to be applied to the initials.                                                                                                                                                                                                                                                     |
| initialsZindex        | `Number`           | `false`  | Initials' z-index value to be using when composing, ensuring proper layering of the rendered image.                                                                                                                                                                                                                                   |
| initialsAlgorithm     | `String`           | `false`  | Algorithm to be used for initials (defaults to `mask_top`).                                                                                                                                                                                                                                                                           |
| initialsBlendColor    | `String`           | `false`  | The background color to be used in the generation of the anti-aliasing (defaults to `000000`).                                                                                                                                                                                                                                        |
| initialsPattern       | `String`           | `false`  | Pattern to be used when tiling.                                                                                                                                                                                                                                                                                                       |
| initialsTexture       | `String`           | `false`  | Texture image to be used when filling the initials.                                                                                                                                                                                                                                                                                   |
| initialsExclusion     | `Array`            | `false`  | Parts to exclude when applying the initials.                                                                                                                                                                                                                                                                                          |
| initialsInclusion     | `Array`            | `false`  | Parts to include when applying the initials.                                                                                                                                                                                                                                                                                          |
| initialsImageRotation | `Number`           | `false`  | Overrides the profile's rotation angle, in degrees, to be applied to the initials image.                                                                                                                                                                                                                                              |
| initialsImageFlip     | `Boolean`          | `false`  | Flip the initials image around the X axis.                                                                                                                                                                                                                                                                                            |
| initialsImageMirror   | `Boolean`          | `false`  | Mirror the initials image around the Y axis.                                                                                                                                                                                                                                                                                          |
| debug                 | `Boolean`          | `false`  | Displays the debug information box.                                                                                                                                                                                                                                                                                                   |
| fontFamily            | `String`           | `false`  | Overrides the profiles font to be applied on the initials.                                                                                                                                                                                                                                                                            |
| fontWeight            | `[String, Number]` | `false`  | Overrides the profiles font weight to be applied on the initials.                                                                                                                                                                                                                                                                     |
| fontSize              | `Number`           | `false`  | Overrides the profiles font size to be applied on the initials.                                                                                                                                                                                                                                                                       |
| fontSpacing           | `Number`           | `false`  | Overrides the profiles spacing between each letter.                                                                                                                                                                                                                                                                                   |
| fontTrim              | `Boolean`          | `false`  | Overrides the profiles font trim, which defines if the initials are trimmed.                                                                                                                                                                                                                                                          |
| fontMask              | `String`           | `false`  | Mask strategy when using raster fonts: `self` means that the alpha channel of the letter image is going to be used to defined both which pixels are going to be passed in the paste operation and the intensity; 'simple' means that just the pixels with a valid alpha value (greater than zero) will be passed to the target image. |
| fontMode              | `String`           | `false`  | Forces a specific font mode, may improve text render (vector fonts) - it's used by some graphics drivers to indicate what mode the driver prefers; usually when the font uses anti-aliasing the mode `L` shall improve rendering.                                                                                                     |
| lineHeight            | `Number`           | `false`  | Overrides the profiles line height, which defines the initials line height.                                                                                                                                                                                                                                                           |
| lineBreaking          | `String`           | `false`  | Line break, is optional and can have one of the the following values: `normal` and `word_break`.                                                                                                                                                                                                                                      |
| shadow                | `Boolean`          | `false`  | Overrides the profiles shadow, which defines if the initials have a shadow.                                                                                                                                                                                                                                                           |
| shadowColor           | `Boolean`          | `false`  | Overrides the profiles color of the shadow to be used.                                                                                                                                                                                                                                                                                |
| shadowOffset          | `Boolean`          | `false`  | Overrides the profiles offset to be applied on the shadow.                                                                                                                                                                                                                                                                            |
| offsets               | `Object`           | `false`  | Overrides the profiles offset to be applied on the initials (e.g. `{ 0: [0, 6], 1: [0, -10], 2: [0, 10] }`)                                                                                                                                                                                                                           |
| curve                 | `Array`            | `false`  | Bezier curve control points, must contain four (e.g. `[[0.2, 0.2], [0.7, 0.2], [0.2, 0.5], [0.7, 0.5]]`).                                                                                                                                                                                                                             |
| name                  | `String`           | `false`  | Name of the image.                                                                                                                                                                                                                                                                                                                    |
| state                 | `Object`           | `false`  | An object containing the state of the personalization. For each group of the model it can contain the initials and the corresponding engraving (eg. { main: { initials: "AB", engraving: "style:grey" }}).                                                                                                                            |
| ripe                  | `Number`           | `false`  | Instance of Ripe SDK initialized, if not defined, the global Ripe SDK instance will be used.                                                                                                                                                                                                                                          |

An example of an instantiation and the correspondent view:

```html
<ripe-image v-bind:brand="'dummy'" v-bind:model="'cube'" v-bind:version="52" v-bind:size="500" />
```

![Image Example](/res/images/image.png)

Similar to the configurator, the frame can be controlled externally to the component, by changing the prop `frame`:

```html
<ripe-image
    v-bind:brand="'dummy'"
    v-bind:model="'cube'"
    v-bind:version="52"
    v-bind:size="1000"
    v-bind:frame="'top-0'"
/>
```

![Image with Frame Example](/res/images/image-frame.png)

The customization of the model can also be provided, with the prop parts:

```html
<ripe-image
    v-bind:brand="'dummy'"
    v-bind:model="'cube'"
    v-bind:version="52"
    v-bind:size="500"
    v-bind:frame="'side-4'"
    v-bind:parts="{
        side: {
            color: 'blue',
            material: 'leather_cbe',
            face: 'side'
        },
        shadow: {
            color: 'default',
            hidden: true,
            material: 'default'
        },
        top0_bottom: {
            color: 'red',
            face: 'side',
            material: 'leather_cbe'
        }
    }"
/>
```

![Image with Parts Example](/res/images/image-parts.png)

The Image component support more complex logic and attributes, such as different formats, crops and personalization options.
By setting the `show-initials` to `true` and providing an `initials-group` and `state`, it is possible to show initials in the model.

A `state` example:

```javascript
const state = {
    initialsExtra: {
        main: {
            initials: "A",
            engraving: "style:white"
        }
    }
};
```

```html
<ripe-image
    v-bind:brand="'dummy'"
    v-bind:model="'cube'"
    v-bind:version="52"
    v-bind:size="1000"
    v-bind:frame="'side-0'"
    v-bind:format="'png'"
    v-bind:crop="true"
    v-bind:show-initials="true"
    v-bind:initials-group="'main'"
    v-bind:state="state"
/>
```

![Image with Personalization](/res/images/image-personalization.png)

It is also possible to provide a `initialsBuilder` function, that allows for a more custom logic in the translation from initials and engraving into initials and profiles.

There can be more than one image using the same instance of RIPE SDK:

```html
<ripe-image
    v-bind:brand="'dummy'"
    v-bind:model="'cube'"
    v-bind:version="52"
    v-bind:size="500"
    v-bind:frame="'side-4'"
    v-bind:ripe="ripe"
/>
<ripe-image
    v-bind:brand="'dummy'"
    v-bind:model="'cube'"
    v-bind:version="52"
    v-bind:size="500"
    v-bind:frame="'top-0'"
    v-bind:ripe="ripe"
/>
```

![Multiple Images](/res/images/multiple-images.png)

## Image with Zoom

In cases where it is necessary to see details in the image, it is possible to use the `ripe-image-zoom`, which applies a given zoom value to the image, centered on a pivot point.

The image with zoom can receive the same parameters from `ripe-image` as well as the following parameters:

| Prop  | Type     | Required | Description                                                                                              |
| ----- | -------- | -------- | -------------------------------------------------------------------------------------------------------- |
| zoom  | `Number` | `false`  | Zoom percentage that controls the level of zoom over the original image, defaults to `100`.              |
| pivot | `Object` | `false`  | The x and y coordinates of the pivot point where the zoom will be applied to, e.g. `{ x: 100, y: 100 }`. |

The zoom value is in percentage, and will not go under the `10%` value, which is the minimum to get a visible image. Below is a comparison between the normal image component and one with zoom.

```html
<ripe-image
    v-bind:brand="'dummy'"
    v-bind:model="'cube'"
    v-bind:version="52"
    v-bind:size="1000"
    v-bind:frame="'top-0'"
/>
<ripe-image-zoom
    v-bind:brand="'dummy'"
    v-bind:model="'cube'"
    v-bind:version="52"
    v-bind:size="1000"
    v-bind:frame="'top-0'"
    v-bind:zoom="140"
    v-bind:pivot="{ x: 40, y: 30 }"
/>
```

![Comparison between image with and without zoom](/res/images/image-zoom.png)

## Image with Zoom on Hover

To allow a more interactive experience with zoom, it is possible to use the `ripe-image-zoom-hover`, which applies a given zoom value to the image when hovering above it, centering it one the mouse position.
It is also possible to enable the scroll wheel to increase and decrease the zoom value.

The image with zoom can receive the same parameters from `ripe-image` as well as the following parameters:

| Prop              | Type       | Required | Description                                                                                                                                                                                                |
| ----------------- | ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| zoom              | `Number`   | `false`  | Zoom percentage that controls the level of zoom over the original image, defaults to `100`.                                                                                                                |
| maxZoom           | `Number`   | `false`  | The maximum zoom percentage allowed over the original image. Defaults to `300`.                                                                                                                            |
| minZoom           | `Number`   | `false`  | The minimum zoom percentage allowed over the original image. Defaults to `10`.                                                                                                                             |
| scrollZoom        | `Boolean`  | `false`  | Enable changing the zoom value with the mouse wheel scroll. Defaults to `false`.                                                                                                                           |
| scrollSensitivity | `Number`   | `false`  | Scroll sensitivity when controlling the zoom value with the mouse wheel scroll. Defaults to `1`.                                                                                                           |

```html
<ripe-image-zoom-hover
    v-bind:brand="'dummy'"
    v-bind:model="'cube'"
    v-bind:version="52"
    v-bind:size="1000"
    v-bind:frame="'top-0'"
    v-bind:zoom="140"
    v-bind:max-zoom="300"
    v-bind:min-zoom="10"
    v-bind:scroll-zoom="true"
    v-bind:scroll-sensitivity="2"
    v-bind:zoom-out="true"
/>
```

![Zoom on hover](/res/images/image-zoom-hover.gif)

## Price

The price component `<ripe-price>` allows for the visualization of the price of a model, according to the currency provided.

The price can receive the following parameters:

| Prop          | Type      | Required | Description                                                                                  |
| ------------- | --------- | -------- | -------------------------------------------------------------------------------------------- |
| brand         | `String`  | `false`  | The brand of the model.                                                                      |
| model         | `String`  | `false`  | The name of the model.                                                                       |
| version       | `Number`  | `false`  | The version of the build.                                                                    |
| config        | `Boolean` | `false`  | Indicates that the component should apply the config internally on component initialization. |
| currency      | `String`  | `false`  | The `ISO 4217` currency code being used for the price of the model.                          |
| parts         | `Object`  | `false`  | The model's customization.                                                                   |
| initials      | `String`  | `false`  | The initials value to be used in the RIPE instance.                                          |
| engraving     | `String`  | `false`  | The engraving value to be used in the RIPE instance.                                         |
| initialsExtra | `Object`  | `false`  | The set of (initials, engraving) per initials group to be used in the RIPE instance.         |
| structure     | `Object`  | `false`  | The normalized structure that uniquely represents the configuration "situation".             |
| ripe          | `Number`  | `false`  | Instance of RIPE SDK initialized, if not defined, the global RIPE SDK instance will be used. |

An example of an instantiation and the correspondent view:

```html
<ripe-price
    v-bind:brand="'dummy'"
    v-bind:model="'cube'"
    v-bind:version="52"
    v-bind:currency="'USD'"
/>
```

![Price Example](/res/images/price.png)

Different customizations can result in different prices. Below is an example of a more expensive customization in both dollars and euros:

```html
<ripe-price
    v-bind:brand="'dummy'"
    v-bind:model="'cube'"
    v-bind:version="52"
    v-bind:currency="'EUR'"
    v-bind:parts="{
        side: {
            color: 'black',
            material: 'crocodile_cbe',
            face: 'side'
        },
        shadow: {
            color: 'default',
            hidden: true,
            material: 'default'
        },
        top0_bottom: {
            color: 'fuchsia',
            face: 'side',
            material: 'suede_cbe'
        }
    }"
/>
```

```html
<ripe-price
    v-bind:brand="'dummy'"
    v-bind:model="'cube'"
    v-bind:version="52"
    v-bind:currency="'USD'"
    v-bind:parts="{
        side: {
            color: 'black',
            material: 'crocodile_cbe',
            face: 'side'
        },
        shadow: {
            color: 'default',
            hidden: true,
            material: 'default'
        },
        top0_bottom: {
            color: 'fuchsia',
            face: 'side',
            material: 'suede_cbe'
        }
    }"
/>
```

![Price Complex Example EUR](/res/images/price-complex-eur.png)
![Price Complex Example USD](/res/images/price-complex-usd.png)

## Pickers

The pickers component `<ripe-pickers>` allows for the customization of a model, by choosing materials and colors for its parts.

The pickers can receive the following parameters:

| Prop          | Type      | Required | Description                                                                                  |
| ------------- | --------- | -------- | -------------------------------------------------------------------------------------------- |
| brand         | `String`  | `false`  | The brand of the model.                                                                      |
| model         | `String`  | `false`  | The name of the model.                                                                       |
| version       | `Number`  | `false`  | The version of the build.                                                                    |
| config        | `Boolean` | `false`  | Indicates that the component should apply the config internally on component initialization. |
| currency      | `String`  | `false`  | The `ISO 4217` currency code being used for the price of the model.                          |
| parts         | `Object`  | `false`  | The model's customization.                                                                   |
| initials      | `String`  | `false`  | The initials value to be used in the RIPE instance.                                          |
| engraving     | `String`  | `false`  | The engraving value to be used in the RIPE instance.                                         |
| initialsExtra | `Object`  | `false`  | The set of (initials, engraving) per initials group to be used in the RIPE instance.         |
| structure     | `Object`  | `false`  | The normalized structure that uniquely represents the configuration "situation".             |
| ripe          | `Number`  | `false`  | Instance of RIPE SDK initialized, if not defined, the global RIPE SDK instance will be used. |

The pickers component will wait for the RIPE configuration to be completed in order to have access to its parts and materials.

An example of an instantiation and the correspondent view:

```javascript
this.ripe = new Ripe();
await this.ripe.config("dummy", "cube", {
    version: 52
});
```

```html
<ripe-pickers v-bind:ripe="ripe" />
```

![Pickers Example](/res/images/pickers.gif)

The pickers can interact with an existing configurator, by using the same RIPE instance:

![Pickers with Configurator Example](/res/images/pickers_configurator.gif)
