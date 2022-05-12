import { Global } from "@emotion/react";

const Fonts = () => {
  return (
    <Global
      styles={`
      @import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@1,700&display=swap');
    `}
    />
  );
};

export default Fonts;
