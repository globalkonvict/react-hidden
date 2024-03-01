# react-hidden

`react-hidden` is a React component designed to offer a flexible and efficient way to control the visibility of UI elements based on the viewport's size, custom media queries, and user preferences. It's an ideal solution for developers looking to implement responsive design patterns without cluttering their components with conditional rendering logic.

# Table of Contents

- [react-hidden](#react-hidden)
- [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Need of the Hidden Component](#need-of-the-hidden-component)
  - [When to Use](#when-to-use)
  - [Installation](#installation)
  - [API and Props](#api-and-props)
    - [Additional Notes:](#additional-notes)
  - [Usage](#usage)
    - [Basic Example](#basic-example)
    - [Using `invert` Prop](#using-invert-prop)
    - [Using Custom Media Queries](#using-custom-media-queries)
    - [Using Media Queries Array](#using-media-queries-array)
    - [Custom Breakpoints](#custom-breakpoints)
    - [With Visibility Callbacks](#with-visibility-callbacks)
    - [Debounce Resize Events](#debounce-resize-events)
    - [Complex Configuration](#complex-configuration)
    - [Nesting `Hidden` components](#nesting-hidden-components)
      - [Scenario: E-commerce Product Page](#scenario-e-commerce-product-page)
      - [Implementation](#implementation)
      - [Explanation](#explanation)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **Responsive Design Made Simple**: Easily hide or show components at different screen sizes without manual breakpoint management.
- **Custom Media Query Support**: Go beyond predefined screen sizes with custom media queries for granular control over component visibility.
- **Dynamic Breakpoints**: Define your own breakpoints to match your design system, providing unparalleled flexibility.
- **Visibility Callbacks**: Execute custom logic when an element is shown or hidden, perfect for analytics or dynamic content loading.
- **Debounce Resize Events**: Improve performance by debouncing resize event handling, reducing the frequency of visibility calculations on window resize.
- **Orientation Change Support**: Responds to changes in device orientation to ensure correct content visibility across all devices.
- **Lightweight and Performant**: With a focus on performance and a minimal footprint, `react-hidden` integrates smoothly without impacting your application's load times.
- **Easy to Integrate**: Designed to work seamlessly within your existing React projects, facilitating rapid development and cleaner code.

## Need of the Hidden Component

- **Simplification of Responsive Logic**: Traditional methods of managing visibility often involve complex CSS with numerous media queries or conditional rendering logic scattered throughout JavaScript code. The `Hidden` component centralizes and simplifies this logic, making it more maintainable and readable.
- **Performance Optimization**: By preventing the rendering of components that are not supposed to be visible on certain devices or under specific conditions, the `Hidden` component can help reduce the load on the browser, leading to faster rendering times and a smoother user experience.
- **Enhanced User Experience**: Different users have different needs based on their device, orientation, or preferences (like dark mode). The `Hidden` component allows developers to tailor the UI to meet these needs, enhancing the overall user experience.
- **Declarative Approach to Visibility**: React encourages a declarative approach to UI development, where the desired state of the UI is described rather than the step-by-step changes to achieve that state. The `Hidden` component fits perfectly into this paradigm by allowing developers to declaratively specify which components should be visible under which conditions.
- **Reduction of Visual Clutter**: On smaller screens, space is at a premium. The `Hidden` component helps manage this space more effectively by hiding non-essential elements, thus reducing clutter and focusing the user's attention on the most important information.

## When to Use

The `Hidden` component is particularly useful in scenarios where conditional visibility of UI elements is required. It's most beneficial:

- **In Responsive Design**: When building responsive websites that need to display differently across a range of devices, from mobile phones to large desktop monitors.
- **For Adaptive Features**: In applications where features or content must adapt to the user's preferences or system settings, such as dark mode, reduced motion, or specific accessibility settings.
- **To Improve User Focus**: In UI designs where minimizing distractions for users on smaller screens or in certain contexts is crucial. By hiding less critical information, users can focus on what's most important.
- **During Progressive Enhancement**: When gradually enhancing the functionality of a website based on the user's browser capabilities, screen size, or other factors, ensuring that the core content or functionality remains accessible to all users.
- **For Performance Considerations**: To conditionally load components based on the viewport size or other conditions, potentially reducing the initial load time and improving the site's performance on devices with limited resources.


## Installation

To install `react-hidden`, run the following command in your project directory:

```bash
npm install react-hidden
```

## API and Props

`react-hidden` accepts a comprehensive set of props to control the visibility of its children elements dynamically. Below is a table detailing these props:

| Prop          | Type                     | Default Value             | Description                                                                                       |
|---------------|--------------------------|---------------------------|---------------------------------------------------------------------------------------------------|
| `xs`          | `boolean`                | `undefined`               | Extra small screens (<576px). If not specified, does not apply.                           |
| `sm`          | `boolean`                | `undefined`               | Small screens (≥576px to <768px). If not specified, does not apply.                      |
| `md`          | `boolean`                | `undefined`               | Medium screens (≥768px to <992px). If not specified, does not apply.                     |
| `lg`          | `boolean`                | `undefined`               | Large screens (≥992px to <1200px). If not specified, does not apply.                     |
| `xl`          | `boolean`                | `undefined`               | Extra large screens (≥1200px to <1600px). If not specified, does not apply.              |
| `xxl`         | `boolean`                | `undefined`               | Extra extra large screens (≥1600px). If not specified, does not apply.                   |
| `media`       | `string \| string[]`     | `undefined`               | Apply custom media query or queries for visibility control. Can be a single string or an array of strings. |
| `children`    | `React.ReactNode`        | Required                  | The content that will be conditionally displayed. This prop is required.                         |
| `invert`      | `boolean`                | `false`                   | Inverts the visibility condition, showing content when conditions are not met.                   |
| `breakpoints` | `object`                 | `defaultBreakpoints`      | Custom breakpoints object to override default breakpoints for responsive design. The default breakpoints are defined as shown in the `defaultBreakpoints` object. |
| `onShow`      | `() => void`             | `undefined`               | Callback function that is executed when the content becomes visible.                            |
| `onHide`      | `() => void`             | `undefined`               | Callback function that is executed when the content becomes hidden.                             |
| `debounce`    | `number`                 | `100`                     | Debounce time in milliseconds for handling resize or orientation change events.                 |

### Additional Notes:

- **`xs`, `sm`, `md`, `lg`, `xl`, `xxl` Props**: These boolean props are used to determine visibility based on the viewport's width. They correspond to commonly used breakpoints but can be overridden by the `breakpoints` prop for custom responsiveness.
  
- **`media` Prop**: This prop allows for more granular control over visibility with custom media queries. It accepts either a single query string or an array of query strings. This is particularly useful for complex responsiveness conditions beyond standard breakpoints.

- **`invert` Prop**: When set to `true`, the visibility logic is reversed. By default, the component hides content based on the specified conditions. With `invert` set to `true`, the content is shown when the conditions are met instead.

- **`breakpoints` Prop**: This object prop allows developers to define their own custom breakpoints, making the component highly adaptable to various design systems. It should match the structure of the `defaultBreakpoints` object.

- **`onShow` and `onHide` Callbacks**: These props provide a way to run custom logic when the visibility of the component's children changes. This can be used for analytics, loading resources, or triggering animations.

- **`debounce` Prop**: This numeric prop defines the debounce time in milliseconds for the event listeners attached to window resize and orientation change events. It helps in optimizing performance by limiting the frequency of visibility checks during rapid viewport changes.

## Usage

The `react-hidden` component offers a flexible way to manage component visibility in response to screen size, orientation, and custom media queries. Below are examples showcasing how to utilize the component from basic usage to complex configurations.

### Basic Example

Hide content on extra small screens.

```jsx
import Hidden from 'react-hidden';

<Hidden xs>
  <p>This text is hidden on extra small screens (<576px).</p>
</Hidden>
```

### Using `invert` Prop

Show content only on extra small screens by inverting the condition.

```jsx
<Hidden xs invert>
  <p>This text is visible only on extra small screens (<576px).</p>
</Hidden>
```

### Using Custom Media Queries

Hide content based on a custom media query.

```jsx
<Hidden media="(max-width: 768px)">
  <p>This text is hidden on screen widths up to 768px.</p>
</Hidden>
```

### Using Media Queries Array

Hide content based on multiple media query conditions.

```jsx
<Hidden media={["(max-width: 768px)", "(orientation: portrait)"]}>
  <p>This content is hidden on screens narrower than 768px or in portrait orientation.</p>
</Hidden>
```

### Custom Breakpoints

Define and use custom breakpoints to match your design system.

```jsx
const customBreakpoints = {
  xs: "(max-width: 640px)",
  sm: "(min-width: 641px) and (max-width: 768px)",
  // Define more custom breakpoints as needed
};

<Hidden breakpoints={customBreakpoints} xs>
  <p>This uses custom breakpoints for extra small screens.</p>
</Hidden>
```

### With Visibility Callbacks

Execute custom logic when content becomes visible or hidden.

```jsx
<Hidden 
  media="(max-width: 768px)" 
  onShow={() => console.log("Content is now visible")} 
  onHide={() => console.log("Content is now hidden")}
>
  <p>Content with visibility callbacks.</p>
</Hidden>
```

### Debounce Resize Events

Control the debounce time for resize and orientation change events.

```jsx
<Hidden media="(max-width: 768px)" debounce={200}>
  <p>This text is hidden on screen widths up to 768px, with debounced resize events.</p>
</Hidden>
```

### Complex Configuration

Combine various props for complex responsive design needs.

```jsx
<Hidden
  breakpoints={{ xs: "(max-width: 500px)", md: "(min-width: 501px) and (max-width: 1200px)" }}
  xs md
  invert
  media={["(orientation: landscape)", "(prefers-color-scheme: dark)"]}
  onShow={() => console.log("Showing in specific conditions")}
  onHide={() => console.log("Hiding in specific conditions")}
  debounce={150}
>
  <div>
    <p>This content shows under complex conditions: either in landscape orientation, prefers dark mode, or not within the xs and md breakpoints.</p>
    <p>It also employs a custom debounce time for resize/orientation change events and executes callbacks on visibility changes.</p>
  </div>
</Hidden>
```

This example demonstrates the `react-hidden` component's capability to handle intricate design and responsiveness challenges by combining multiple features. By leveraging custom breakpoints, invert logic, media queries (including arrays of conditions), debounce handling, and visibility callbacks, developers can precisely control component visibility across a wide range of devices and user preferences.

### Nesting `Hidden` components

Nesting `Hidden` components can provide a powerful way to create complex, responsive designs that cater to very specific conditions. Here's an example scenario where nesting can be particularly effective:

#### Scenario: E-commerce Product Page

Imagine an e-commerce product page with the following requirements for displaying promotional banners:

- A general promotional banner should be visible on all devices except for extra small screens.
- An exclusive mobile-only offer should be displayed on extra small screens.
- On large screens, in addition to the general promotional banner, a special announcement for free shipping is also to be shown.
- During a sale event, an additional "Sale" banner should replace the mobile-only offer on extra small screens and be added to the existing banners on larger screens.

#### Implementation

```jsx
import Hidden from 'react-hidden';

function ProductPage() {
  return (
    <div>
      {/* General Promotional Banner (hidden on extra small screens) */}
      <Hidden xs>
        <div className="banner general-promotion">
          <p>Don't miss our special offers!</p>
        </div>
      </Hidden>

      {/* Exclusive Mobile Offer */}
      <Hidden sm md lg xl xxl>
        <div className="banner mobile-exclusive">
          <p>Exclusive offer for mobile users!</p>
        </div>
      </Hidden>

      {/* Nested Hidden components for complex conditions */}
      <Hidden xs sm md>
        {/* This will only show on lg and xl screens */}
        <div className="banner free-shipping">
          <p>Free shipping on orders over $50!</p>
        </div>
        
        {/* Additional "Sale" banner for large devices during sale events */}
        <Hidden invert media="(min-width: 992px)">
          <div className="banner sale-announcement">
            <p>Sale! Up to 50% off!</p>
          </div>
        </Hidden>
      </Hidden>

      {/* Sale Banner for Extra Small Devices */}
      <Hidden sm md lg xl xxl>
        <div className="banner sale-announcement">
          <p>Mobile Sale! Exclusive discounts!</p>
        </div>
      </Hidden>
    </div>
  );
}
```

#### Explanation

- The **General Promotional Banner** is set to be hidden on extra small (`xs`) devices using the `Hidden` component. This ensures that users on small devices aren't overwhelmed by too many promotions.
- The **Exclusive Mobile Offer** is shown only on extra small devices, targeting mobile users with specific offers.
- For larger screens (`lg` and above), the **Free Shipping Announcement** is displayed alongside the general promotional banner. This is achieved by nesting a `Hidden` component within another `Hidden` component set to activate at larger breakpoints.
- During sale events, the **Sale Banner** for extra small devices provides a targeted message to mobile users, while an additional nested `Hidden` component reveals a sale announcement on larger screens without hiding the free shipping announcement.

This example demonstrates how nesting `Hidden` components allows for nuanced visibility control, enabling the creation of responsive layouts that adapt content visibility to a wide range of conditions, enhancing user experience across different devices.

## Contributing
Contributions are welcome! Please read our contributing guidelines for details on how to submit pull requests, report issues, or suggest enhancements.

## License
`react-hidden` is MIT licensed.
