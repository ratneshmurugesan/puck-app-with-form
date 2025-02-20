import { AutoField, DropZone, FieldLabel, type Config } from "@measured/puck";

type Props = {
  // HeadingBlock: { title: string };
  // FormBlock: {
  //   label :string;
  //   title: string;
  //   // fields: unknown;
  // }
  FormComponent: {
    title: string;
    // textAlign: string;
    // resolveFields: any;
    items: any[];
  };
};

export const config: Config<Props> = {
  components: {
    // HeadingBlock: {
    //   fields: {
    //     title: { type: "text" },
    //   },
    //   defaultProps: {
    //     title: "Heading",
    //   },
    //   render: ({ title }) => (
    //     <div style={{ padding: 64 }}>
    //       <h1>{title}</h1>
    //     </div>
    //   ),
    // },
    FormComponent: {
      label: "Form",
      fields: {
        title: { type: "text" },
        items: {
          type: "array",
          arrayFields: {
            title: { type: "text", label: "Y" },
            textAlign: {
              type: "select",
              options: [
                { label: "Left", value: "left" },
                { label: "Right", value: "right" },
              ],
            },
          },
          defaultItemProps: {
            title: "Element Label",
          },
        },
      },
      defaultProps: {
        title: "Form",
        items: [],
      },
      // resolveFields: (data) => {
      //   console.log({ data });
      //   // const fields = {
      //   //   title: {
      //   //     type: "radio",
      //   //     options: [
      //   //       { label: "Water", value: "water" },
      //   //       { label: "Orange juice", value: "orange-juice" },
      //   //     ],
      //   //   },
      //   // };
      //   // if (data.props.drink === "water") {
      //   //   return {
      //   //     ...fields,
      //   //     waterType: {
      //   //       // ... Define field
      //   //     },
      //   //   };
      //   // }
      //   return null;
      // },
      render: ({ title, items }) => {
        // console.log({ title, items });
        return (
          <div
            className="custom-form"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
              flex: 1,
              paddingTop: 16,
              paddingBottom: 16,
            }}
          >
            <p>{title as unknown as string}</p>
            {items?.map((item, i) => {
              // console.log({ item });
              return (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <>
                    {/* <FieldLabel label={item.label}>
                    <span key={i}>{item.title}</span>
                  </FieldLabel>
                  <input name={item.name} /> */}
                    <FieldLabel label={item.label}>
                      <span key={i}>{item.title}</span>
                    </FieldLabel>
                    {/* <AutoField
                    field={{ type: "text" }}
                    onChange={(value) => {
                      console.log({ value });
                      item.onChange(value);
                    }}
                    value={item.value}
                  /> */}
                    <input
                      defaultValue={item.value}
                      name={item.name}
                      onChange={(e) => {
                        console.log({ v: e.currentTarget.value });
                        item.onChange(e.currentTarget.value);
                      }}
                      style={{ border: "1px solid black", padding: 4 }}
                    />
                  </>
                </div>
              );
            })}
          </div>
        );
      },
    },
    // FormBlock: {
    //   label: "Form Block!!",
    //   fields: {
    //     title: {
    //       type: "custom",
    //       render: ({ name, onChange, value }) => (
    //         <>
    //           <input
    //             defaultValue={`${value}-!!`}
    //             name={name}
    //             onChange={(e) => onChange(e.currentTarget.value)}
    //           />
    //           <button>Add</button>
    //         </>
    //       ),
    //     },
    //     textAlign: {
    //       type: "select",
    //       options: [
    //         { label: "Left", value: "left" },
    //         { label: "Right", value: "right" },
    //       ],
    //     },
    //     // textAlign: {
    //     //   type: "select",
    //     //   options: [
    //     //     { label: "Left", value: "left" },
    //     //     { label: "Right", value: "right" },
    //     //   ],
    //     // },
    //     data: {
    //       type: "external",
    //       fetchList: async () => {
    //         // ... fetch data from a third party API, or other async source

    //         return [
    //           { title: "Hello, world", description: "Lorem ipsum 1" },
    //           { title: "Goodbye, world", description: "Lorem ipsum 2" },
    //         ];
    //       },
    //     },
    //   },
    //   defaultProps: {
    //     title: "Hello, world",
    //     data: { title: "1" },
    //     textAlign: "",
    //   },
    //   // render: () => (
    //   //   <div
    //   //     style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
    //   //   >
    //   //     <DropZone zone="left-column" />
    //   //     <DropZone zone="right-column" />
    //   //   </div>
    //   // ),
    //   // render: ({ title, data, textAlign }) => (
    //   //   <>
    //   //     <h1>{title}</h1>
    //   //     <p>{data?.title || "No data selected"}</p>
    //   //   </>
    //   // ),
    //   //   resolveData: async ({ props }) => {
    //   //     return {
    //   //       props: {
    //   //         resolvedTitle: props.title,
    //   //       },
    //   //     };
    //   //   },
    //   //   render: ({ resolvedTitle }) => {
    //   //     return <h1>{resolvedTitle}</h1>;
    //   //   },
    //   // },
    //   render: () => (
    //     <div style={{ padding: 32 }}>
    //       <p>Form</p>
    //     </div>
    //   ),
    // },
  },
};

export default config;
