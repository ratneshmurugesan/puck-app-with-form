export const MyPlugin = {
  overrides: {
    componentItem: ({ name }) => (
      <div style={{ backgroundColor: "hotpink" }}>{name}</div>
    ),
  },
};
