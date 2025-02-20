"use client";

import type { Data } from "@measured/puck";
import { Puck, usePuck } from "@measured/puck";
import config from "../../../puck.config";

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
  console.log({ data });

  return (
    <Puck
      config={config}
      data={data}
      // onPublish={async (data) => {
      //   await fetch("/puck/api", {
      //     method: "post",
      //     body: JSON.stringify({ data, path }),
      //   });
      // }}
      onAction={(action, appState, prevAppState) => {
        console.log({ action, appState, prevAppState });
        // if (action.type === "insert") {
        //   console.log("New component was inserted", appState);
        // }
        // if (action.type === "submit") {
        // const formData = appState.data.content.find(
        //   (component) => component.type === "FormComponent"
        // ).props;
        // console.log({ formData });
        // }
      }}
      // plugins={[MyPlugin]}
    />
  );
  // return (
  //   <>
  //   <Puck
  //     config={config}
  //     data={data}
  //     onPublish={async (data) => {
  //       await fetch("/puck/api", {
  //         method: "post",
  //         body: JSON.stringify({ data, path }),
  //       });
  //     }}
  //   />
  //   </>
  // );
}
