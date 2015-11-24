// Type definitions for react-popout v0.4.0
// Project: https://github.com/JakeGinnivan/react-popout
// Definitions by: Internet Vision Technologies <https://github.com/ivt>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="../react/react.d.ts" />

declare module "react-popout" {

    /**
     * If/when https://github.com/Microsoft/TypeScript/issues/3192 gets solved, then this can be changed to
     * an enum with string values "yes" and "no".
     */
    type YesNo = string;

    /**
     * Arguments to be passed to `window.open()` when constructing the popout window.
     */
    interface WindowOptions {
        toolbar?: YesNo;
        location?: YesNo;
        directories?: YesNo;
        status?: YesNo;
        menubar?: YesNo;
        scrollbars?: YesNo;
        resizable?: YesNo;
        width?: number;
        height?: number;
        top?: (o:Window, w:Window) => number;
        left?: (o:Window, w:Window) => number;
    }

    interface Props extends __React.Props<PopoutWindow> {
        title: string;
        url?: string;
        onClosing?: () => void;
        onMessage?: (event:MessageEvent) => void;
        options?: WindowOptions;
        window?: Window;
    }

    class PopoutWindow extends __React.Component<Props, {}> {
        closeWindow():void;
    }
}
