import { ArrayField, AutoField, FieldLabel, type Config } from "@measured/puck";

type Props = {
  FormComponent: {
    title: string;
    items: unknown;
  };
};

const fieldPairStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "auto auto",
  gap: 4,
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "70vw",
};

export const config: Config<Props> = {
  components: {
    FormComponent: {
      label: "Form",
      defaultProps: {
        title: "Form",
        items: [],
      },
      resolveFields: async (data) => {
        console.log({ data });
        const fields = {
          title: {
            type: "text" as const,
            render: AutoField,
          },
          items: {
            type: "array" as const,
            arrayFields: {
              title: { type: "text", label: "label" },
              fieldType: {
                type: "select",
                label: "field Type",
                options: [
                  { label: "Text", value: "text" },
                  { label: "Radio", value: "radio" },
                  { label: "Select", value: "select" },
                  { label: "Checkbox", value: "checkbox" },
                  { label: "Textarea", value: "textarea" },
                ],
              },
            },
            getItemSummary: (item) => item.title || "Item",
            defaultItemProps: {
              title: "Element Label",
              items: [
                {
                  fieldType: "text",
                  title: "Element Label",
                },
              ],
            },
          } as ArrayField<typeof fields.items>,
        };

        const updatedObj = {
          ...fields,
          ...(data.props.items as Record<string, unknown>),
        };

        console.log("Y found", updatedObj);
        return updatedObj;
      },
      render: ({ title, items }) => {
        return (
          <div
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
            <p style={{ fontWeight: "bold", fontSize: 24 }}>
              {title as unknown as string}
            </p>
            {(items as unknown as Array<Record<string, any>>)?.map(
              (item, i) => {
                if (item.fieldType === "text") {
                  return (
                    <div key={i} style={fieldPairStyle}>
                      <FieldLabel label={item.label}>
                        <span key={i}>{item.title}</span>
                      </FieldLabel>
                      <input
                        defaultValue={item.value}
                        name={item.name}
                        onChange={(e) => {
                          console.log({ v: e.currentTarget.value });
                          item.onChange(e.currentTarget.value);
                        }}
                        style={{ border: "1px solid black", padding: 4 }}
                      />
                    </div>
                  );
                } else if (item.fieldType === "textarea") {
                  return (
                    <div key={i} style={fieldPairStyle}>
                      <FieldLabel label={item.label}>
                        <span key={i}>{item.title}</span>
                      </FieldLabel>
                      <textarea
                        defaultValue={item.value}
                        name={item.name}
                        onChange={(e) => {
                          console.log({ v: e.currentTarget.value });
                          item.onChange(e.currentTarget.value);
                        }}
                        style={{ border: "1px solid black", padding: 4 }}
                      />
                    </div>
                  );
                } else if (item.fieldType === "radio") {
                  console.log({ radio: item });
                  return (
                    <div key={i} style={fieldPairStyle}>
                      <FieldLabel label={item.label}>
                        <span key={i}>{item.title}</span>
                      </FieldLabel>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          gap: 4,
                        }}
                      >
                        {Array.from({ length: 3 })
                          .map((_, i) => ({
                            id: `radio-${i}`,
                            value: i,
                            label: `Radio option ${i}`,
                          }))
                          .map((option, j) => (
                            <label key={j}>
                              <input
                                type="radio"
                                name={item.name}
                                value={option.value}
                                checked={item.value === option.value}
                                onChange={(e) => {
                                  console.log({ v: e.currentTarget.value });
                                  item.onChange(e.currentTarget.value);
                                }}
                              />
                              {option.label}
                            </label>
                          ))}
                      </div>
                    </div>
                  );
                } else if (item.fieldType === "select") {
                  return (
                    <div key={i} style={fieldPairStyle}>
                      <FieldLabel label={item.label}>
                        <span key={i}>{item.title}</span>
                      </FieldLabel>
                      <select
                        name={item.name}
                        value={item.value}
                        onChange={(e) => {
                          console.log({ v: e.currentTarget.value });
                          item.onChange(e.currentTarget.value);
                        }}
                        style={{ border: "1px solid black", padding: 4 }}
                      >
                        {Array.from({ length: 3 })
                          .map((_, i) => ({
                            id: `select-${i}`,
                            value: i,
                            label: `Select option ${i}`,
                          }))
                          .map((option, j) => (
                            <option key={j} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                      </select>
                    </div>
                  );
                } else if (item.fieldType === "checkbox") {
                  return (
                    <div key={i} style={fieldPairStyle}>
                      <FieldLabel label={item.label}>
                        <span key={i}>{item.title}</span>
                      </FieldLabel>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          gap: 4,
                        }}
                      >
                        {Array.from({ length: 2 })
                          .map((_, i) => ({
                            id: `checkbox-${i}`,
                            value: i,
                            label: `Checkbox option ${i}`,
                          }))
                          .map((option, j) => (
                            <label key={j}>
                              <input
                                type="checkbox"
                                name={item.name}
                                value={option.value}
                                checked={!!item.value?.includes(option.value)}
                                onChange={(e) => {
                                  const values = Array.from(
                                    (
                                      e.currentTarget as HTMLInputElement
                                    ).closest("form")!.elements
                                  )
                                    .map((el) => (el as HTMLInputElement).value)
                                    .filter(Boolean);

                                  item.onChange(values);
                                }}
                              />
                              {option.label}
                            </label>
                          ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={i} style={fieldPairStyle}>
                    <FieldLabel label={item.label}>
                      <span key={i}>{item.title}</span>
                    </FieldLabel>
                    <input
                      defaultValue={item.value}
                      name={item.name}
                      onChange={(e) => {
                        console.log({ v: e.currentTarget.value });
                        item.onChange(e.currentTarget.value);
                      }}
                      style={{ border: "1px solid black", padding: 4 }}
                    />
                  </div>
                );
              }
            )}
          </div>
        );
      },
    },
  },
};

export default config;
