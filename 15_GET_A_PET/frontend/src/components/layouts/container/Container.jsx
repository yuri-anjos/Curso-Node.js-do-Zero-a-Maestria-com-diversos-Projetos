import containerStyle from "./Container.module.css";

const Container = ({ children }) => {
  return <main className={containerStyle.container}>{children}</main>;
};

export default Container;
