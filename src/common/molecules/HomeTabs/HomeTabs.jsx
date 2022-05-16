import { TabElement } from "../../atoms/Tab/Tab";
import styles from "./HomeTabs.module.scss";

export const HomeTabs = ({ active, handlers }) => {
  return (
    <div className={styles.tab}>
      <TabElement
        clickHandler={handlers[0]}
        displayName="Latest"
        active={active === "latest"}
      />
      <TabElement
        clickHandler={handlers[1]}
        displayName="Trending"
        active={active === "trending"}
      />
    </div>
  );
};
