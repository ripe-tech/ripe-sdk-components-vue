# Documentation - Overview

## Configurator

The configurator component provides an interactive configuration experience inside a DOM. The user can interact with a model by rotating, highlighting and selecting it.

The configurator can receive the following parameters:

| Prop            | Type      | Required | Description                                                                                                                                    |
| --------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| brand           | `String`  | `true`   | The brand of the model.                                                                                                                        |
| model           | `String`  | `true`   | The name of the model.                                                                                                                         |
| version         | `Number`  | `true`   | The version of the build.                                                                                                                      |
| parts           | `Object`  | `false`  | The model's customization.                                                                                                                     |
| frame           | `String`  | `false`  | The name of the frame to be shown in the configurator. For example, frame `1` on `side` would be `side-1`, and a `top` frame would be `top-1`. |
| size            | `Number`  | `false`  | The size (in pixels) of the configurator. If not defined, the configurator will use all the screen space available.                            |
| loader          | `Boolean` | `false`  | Flag for showing a loader when the configurator is loading.                                                                                    |
| selectedPart    | `String`  | `false`  | Part of the model that is currently selected (eg: side).                                                                                       |
| highlightedPart | `String`  | `false`  | Part of the model that is currently highlighted (eg:side). Only possible if the usage of masks is enabled.                                     |
| sensitivity     | `Number`  | `false`  | Configurator rotation sensitivity to the user mouse drag action. The bigger the number, more sensible it is.                                   |
| useMasks        | `Boolean` | `false`  | Usage of masks in the current model, necessary for the part highlighting action.                                                               |
| duration        | `Number`  | `false`  | The duration in milliseconds that the configurator frame transition should take.                                                               |
| animation       | `String`  | `false`  | The configurator animation style: 'simple' (fade in), 'cross' (crossfade) or 'null'.                                                           |
| format          | `String`  | `false`  | The format of the configurator image, (eg: png, jpg, svg, etc.).                                                                               |
| ripe            | `Object`  | `false`  | Instance of Ripe SDK initialized, if not defined, a new one will be instantiated.                                                              |

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

There can be more than one configurator using the same instance of Ripe SDK:

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

Which uses a Ripe SDK instance that can be initialized like this:

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

| Prop            | Type       | Required | Description                                                                                                                                                                                                |
| --------------- | ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| brand           | `String`   | `true`   | The brand of the model.                                                                                                                                                                                    |
| model           | `String`   | `true`   | The name of the model.                                                                                                                                                                                     |
| version         | `Number`   | `true`   | The version of the build.                                                                                                                                                                                  |
| parts           | `Object`   | `false`  | The model's customization.                                                                                                                                                                                 |
| frame           | `String`   | `false`  | The name of the frame to be shown in the image. For example, frame `1` on `side` would be `side-1`, and a `top` frame would be `top-1`.                                                                    |
| size            | `Number`   | `false`  | The size (in pixels) of the image. If not defined, the image will use all the screen space available.                                                                                                      |
| format          | `String`   | `false`  | The format of the image, (eg: png, jpg, svg, etc.). Defaults to 'png'.                                                                                                                                     |
| crop            | `Boolean`  | `false`  | Indicates that the image composition is to be cropped. Crops the current image according to the minimal possible bounding box in both x and y axis.                                                        |
| showInitials    | `Boolean`  | `false`  | Indicates if the personalization should be shown. Defaults to `false`.                                                                                                                                     |
| initialsGroup   | `String`   | `false`  | The group in which the image initials belongs to.                                                                                                                                                          |
| initialsBuilder | `Function` | `false`  | A function that receives the initials and engraving as strings and the img element that will be used and returns a map with the initials and a profile list.                                               |
| state           | `Object`   | `false`  | An object containing the state of the personalization. For each group of the model it can contain the initials and the corresponding engraving (eg. { main: { initials: "AB", engraving: "style:grey" }}). |
| ripe            | `Number`   | `false`  | Instance of Ripe SDK initialized, if not defined, a new one will be instantiated.                                                                                                                          |
| name            | `String`   | `false`  | Name of the image.                                                                                                                                                                                         |

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

There can be more than one image using the same instance of Ripe SDK:

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

## Price

The price component `<ripe-price>` allows for the visualization of the price of a model, according to the currency provided.

The component can receive the following parameters:

| Prop     | Type     | Required | Description                                                                       |
| -------- | -------- | -------- | --------------------------------------------------------------------------------- |
| brand    | `String` | `true`   | The brand of the model.                                                           |
| model    | `String` | `true`   | The name of the model.                                                            |
| version  | `Number` | `true`   | The version of the build.                                                         |
| parts    | `Object` | `false`  | The model's customization.                                                        |
| currency | `String` | `true`   | The `ISO 4217` currency code in which the price will be displayed.                |
| ripe     | `Object` | `false`  | Instance of Ripe SDK initialized, if not defined, a new one will be instantiated. |

An example of an instantiation and the correspondent view:

```
<ripe-price
    v-bind:brand="'dummy'"
    v-bind:model="'cube'"
    v-bind:version="52"
    v-bind:currency="'USD'"
/>
```

![Price Example](/res/images/price.png)

Different customizations can result in different prices. Below is an example of a more expensive customization in both dollars and euros:

```
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

```
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

| Prop | Type     | Required | Description                       |
| ---- | -------- | -------- | --------------------------------- |
| ripe | `Object` | `true`   | Instance of Ripe SDK initialized. |

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
