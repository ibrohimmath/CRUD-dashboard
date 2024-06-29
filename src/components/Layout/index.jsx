import clsx from "clsx";
import Sidebar from "./components/Sidebar";

import cn from "./style.module.scss";

function Layout({ children }) {
  return (
    <div className={clsx(cn["layout"])}>
      <Sidebar />
      <div className={clsx(cn["layout-content"])}>{children}</div>
    </div>
  );
}

export default Layout;
