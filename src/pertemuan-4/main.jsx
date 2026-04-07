import { createRoot } from "react-dom/client";
import "./tailwind.css";
import FrameworkList from "./FrameworkList";
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
import ResponsiveGrid from "./ResponsiveGrid";


createRoot(document.getElementById("root")).render(
  <div>
  {/* //  <FrameworkList></FrameworkList> */}
    {/* <FrameworkListSearchFilter></FrameworkListSearchFilter> */}
    <ResponsiveGrid></ResponsiveGrid>
  </div>
);