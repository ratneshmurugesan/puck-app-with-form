import { ArrayField, AutoField, FieldLabel, type Config } from "@measured/puck";
import { v4 as uuidv4 } from "uuid";

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
  gap: 16,
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "70vw",
  fontSize: 24,
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
                id: `${uuidv4()}`,
                options: [
                  { label: "Text", value: "text" },
                  { label: "Radio", value: "radio" },
                  { label: "Select", value: "select" },
                  { label: "Checkbox", value: "checkbox" },
                  { label: "Textarea", value: "textarea" },
                ],
              },
              ...((data.props.items as Record<string, unknown>[]).find(
                (item) =>
                  item.fieldType !== "text" && item.fieldType !== "textarea"
              )
                ? {
                    fieldOptionCount: {
                      type: "number",
                      label: "No.of options",
                      min: 1,
                    },
                  }
                : {}),
            },
            getItemSummary: (item) => `${item.title}` || "Item",
            defaultItemProps: {
              id: `${uuidv4()}`,
              title: "Text Label",
              fieldType: "text",
            },
          } as ArrayField<typeof fields.items>,
        };

        const updatedObj = {
          ...fields,
          ...(data.props.items as Record<string, unknown>),
        };
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
                      <AutoField
                        field={{ type: "text" }}
                        onChange={(e) => {
                          item.onChange(e.currentTarget.value);
                        }}
                        value={item.value}
                      />
                    </div>
                  );
                } else if (item.fieldType === "textarea") {
                  return (
                    <div key={i} style={fieldPairStyle}>
                      <FieldLabel label={item.label}>
                        <span key={i}>{item.title}</span>
                      </FieldLabel>
                      <AutoField
                        field={{ type: "textarea" }}
                        value={item.value}
                        onChange={(e) => {
                          item.onChange(e.currentTarget.value);
                        }}
                      />
                    </div>
                  );
                } else if (item.fieldType === "radio") {
                  if (!item.fieldOptionCount)
                    return (
                      <div key={i} style={fieldPairStyle}>
                        <p>Add no. of options</p>
                      </div>
                    );
                  return (
                    <div key={i} style={fieldPairStyle}>
                      <FieldLabel label={item.label}>
                        <span key={i}>{item.title}</span>
                      </FieldLabel>
                      <div style={fieldPairStyle}>
                        {item.fieldOptionCount > 0 ? (
                          Array.from({ length: item.fieldOptionCount })
                            .map((_, i) => ({
                              id: `radio-${i}`,
                              value: i,
                              label: `Radio option ${i}`,
                            }))
                            .map((option) => (
                              <label key={option.id}>
                                <input
                                  type="radio"
                                  name={item.name}
                                  value={option.value}
                                  checked={item.value === option.value}
                                  onChange={(e) => {
                                    item.onChange(e.currentTarget.value);
                                  }}
                                  style={{
                                    width: 16,
                                    height: 16,
                                  }}
                                />
                                {option.label}
                              </label>
                            ))
                        ) : (
                          <p>Add no. of options</p>
                        )}
                      </div>
                    </div>
                  );
                } else if (item.fieldType === "select") {
                  if (!item.fieldOptionCount)
                    return (
                      <div key={i} style={fieldPairStyle}>
                        <p>Add no. of options</p>
                      </div>
                    );
                  return (
                    <div key={i} style={fieldPairStyle}>
                      <FieldLabel label={item.label}>
                        <span key={i}>{item.title}</span>
                      </FieldLabel>
                      <select
                        name={item.name}
                        value={item.value}
                        onChange={(e) => {
                          item.onChange(e.currentTarget.value);
                        }}
                        style={{ border: "1px solid black", padding: 4 }}
                      >
                        {item.fieldOptionCount > 0 ? (
                          Array.from({ length: item.fieldOptionCount })
                            .map((_, i) => ({
                              id: `select-${i}`,
                              value: i,
                              label: `Select option ${i}`,
                            }))
                            .map((option) => (
                              <option key={option.id} value={option.value}>
                                {option.label}
                              </option>
                            ))
                        ) : (
                          <p>Add no. of options</p>
                        )}
                      </select>
                    </div>
                  );
                } else if (item.fieldType === "checkbox") {
                  if (!item.fieldOptionCount)
                    return (
                      <div key={i} style={fieldPairStyle}>
                        <p>Add no. of options</p>
                      </div>
                    );
                  return (
                    <div key={i} style={fieldPairStyle}>
                      <FieldLabel label={item.label}>
                        <span key={i}>{item.title}</span>
                      </FieldLabel>
                      <div style={fieldPairStyle}>
                        {item.fieldOptionCount > 0 ? (
                          Array.from({ length: item.fieldOptionCount })
                            .map((_, i) => ({
                              id: `checkbox-${i}`,
                              value: i,
                              label: `Checkbox option ${i}`,
                            }))
                            .map((option) => (
                              <label key={option.id}>
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
                                      .map(
                                        (el) => (el as HTMLInputElement).value
                                      )
                                      .filter(Boolean);

                                    item.onChange(values);
                                  }}
                                  style={{
                                    width: 16,
                                    height: 16,
                                  }}
                                />
                                {option.label}
                              </label>
                            ))
                        ) : (
                          <p>Add no. of options</p>
                        )}
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
