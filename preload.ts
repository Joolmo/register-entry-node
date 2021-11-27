import { contextBridge } from "electron";
import { ipcRenderer } from "electron/renderer";

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            return ipcRenderer.invoke(channel, data);
        }, 
        receive: (channel, func) => {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
);