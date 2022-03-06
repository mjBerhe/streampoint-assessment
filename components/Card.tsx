import { useState } from "react";
import { Drawer, Input } from "antd";
import { SettingOutlined, FormatPainterOutlined } from "@ant-design/icons";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

const { TextArea } = Input;

type TabName = "settings" | "styles";
type TabItem = {
  name: TabName;
  icon: JSX.Element;
};

const tabs: TabItem[] = [
  {
    name: "settings",
    icon: <SettingOutlined style={{ fontSize: "20px", color: "#4f4f4f" }} />,
  },
  {
    name: "styles",
    icon: (
      <FormatPainterOutlined style={{ fontSize: "20px", color: "#4f4f4f" }} />
    ),
  },
];

const Card: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<TabName>("settings");
  const [titleInput, setTitleInput] = useState<string>("");
  const [bodyInput, setBodyInput] = useState<string>("");

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleTabChange = (tab: TabName) => {
    setCurrentTab(tab);
  };

  return (
    <>
      <div className="card">
        <div className="card-title-area">
          <div className="card-title">
            {titleInput ? titleInput : "Custom Title"}
          </div>
          <div className="card-buttons">
            <button onClick={showDrawer}>Edit</button>
            <button>Copy</button>
            <button>Delete</button>
          </div>
        </div>

        <div className="card-line"></div>

        <div className="card-body">
          {bodyInput ? bodyInput : "Custom body text"}
        </div>
      </div>
      <Drawer
        onClose={onClose}
        visible={visible}
        closable={false}
        className="card-drawer"
        width={350}
        bodyStyle={{
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.14)",
          // borderRadius: "16px 0 0 0",
          // border: "1px solid black",
          width: 350,
          padding: 0,
        }}
        style={{
          marginTop: 90,
        }}
        // drawerStyle={{
        //   border: "1px solid red",
        //   borderRadius: "16px",
        // }}
        maskStyle={{
          background: "transparent",
        }}
      >
        <div className="menu-container">
          <div className="drawer-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={
                  currentTab === tab.name
                    ? "drawer-button-selected"
                    : "drawer-button-unselected"
                }
                onClick={() => handleTabChange(tab.name)}
              >
                {tab.icon}
              </button>
            ))}
          </div>
          <div>
            {currentTab === "settings" && (
              <div className="settings-tab">
                <div className="settings-input">
                  <label htmlFor="titleInput">Title Text</label>
                  <Input
                    id="titleInput"
                    type="text"
                    placeholder="Enter custom title"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.currentTarget.value)}
                  />
                </div>

                <div className="settings-input">
                  <label htmlFor="bodyInput">Body Text</label>
                  <TextArea
                    id="bodyInput"
                    placeholder="Enter custom text"
                    value={bodyInput}
                    onChange={(e) => setBodyInput(e.currentTarget.value)}
                  />
                </div>
              </div>
            )}
            {currentTab === "styles" && <div>styles</div>}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Card;
