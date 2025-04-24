import browser from "webextension-polyfill";

interface Message {
    type: string;
}

browser.runtime.onMessage.addListener((message: Message): Promise<string> | void => {
    if (message.type === "GET_SELECTION") {
        const selection: string = window.getSelection()?.toString() || "";
        return Promise.resolve(selection);
    }
});
