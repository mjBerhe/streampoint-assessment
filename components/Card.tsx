import { useState } from "react";
import { Drawer, Input, Divider } from "antd";
import {
  SettingOutlined,
  FormatPainterOutlined,
  EditTwoTone,
  CopyTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import { BlockPicker } from "react-color";

const { TextArea } = Input;

type TabName = "settings" | "styles";
type TabItem = {
  name: TabName;
  icon: (selected: boolean) => JSX.Element;
};

const tabs: TabItem[] = [
  {
    name: "settings",
    icon: (selected) => (
      <SettingOutlined
        className={selected ? "icon-selected" : "icon-unselected"}
      />
    ),
  },
  {
    name: "styles",
    icon: (selected) => (
      <FormatPainterOutlined
        className={selected ? "icon-selected" : "icon-unselected"}
      />
    ),
  },
];

const Card: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<TabName>("settings");

  const [titleInput, setTitleInput] = useState<string>("");
  const [bodyInput, setBodyInput] = useState<string>("");
  const [titleSize, setTitleSize] = useState<number>(36);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleTabChange = (tab: TabName) => {
    setCurrentTab(tab);
  };

  const [titleColor, setTitleColor] = useState<string>("#0e2748");
  const [isTitleColorOpen, setIsTitleColorOpen] = useState<boolean>(false);
  const [bodyColor, setBodyColor] = useState<string>("#4f4f4f");
  const [isBodyColorOpen, setIsBodyColorOpen] = useState<boolean>(false);
  const [panelColor, setPanelColor] = useState<string>("#ffffff");
  const [isPanelColorOpen, setIsPanelColorOpen] = useState<boolean>(false);

  return (
    <>
      <div className="card" style={{ backgroundColor: panelColor }}>
        <div className="card-title-area">
          <div className="card-title" style={{ color: titleColor }}>
            {titleInput ? titleInput : "Custom Title"}
          </div>
          <div className="card-buttons">
            <button onClick={showDrawer}>
              <EditTwoTone className="card-icon" />
            </button>
            <button>
              <CopyTwoTone className="card-icon" />
            </button>
            <button>
              <DeleteTwoTone className="card-icon" />
            </button>
          </div>
        </div>

        <div className="card-line"></div>

        <div className="card-body" style={{ color: bodyColor }}>
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
                {tab.icon(currentTab === tab.name)}
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
                    className="settings-inputbox"
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
                    className="settings-textarea"
                    placeholder="Enter custom text"
                    value={bodyInput}
                    onChange={(e) => setBodyInput(e.currentTarget.value)}
                  />
                </div>
              </div>
            )}
            {currentTab === "styles" && (
              <div className="styles-tab">
                <div className="styles-section">
                  <label className="styles-heading">Title</label>
                  <div className="styles-body-container">
                    <div className="styles-body-section">
                      <h4>Size</h4>
                      <Input placeholder="36px" className="styles-input" />
                    </div>
                    <div className="styles-body-section">
                      <h4>Color</h4>
                      <div
                        className="styles-color-picker"
                        style={{ zIndex: isTitleColorOpen ? 100 : 1 }}
                      >
                        <button
                          style={{ backgroundColor: titleColor }}
                          onClick={() => setIsTitleColorOpen((prev) => !prev)}
                        ></button>
                        {isTitleColorOpen && (
                          <BlockPicker
                            className="block-picker"
                            color={titleColor}
                            onChange={(color) => setTitleColor(color.hex)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <Divider />

                <div className="styles-section">
                  <label className="styles-heading">Body</label>
                  <div className="styles-body-container">
                    <div className="styles-body-section">
                      <h4>Size</h4>
                      <Input placeholder="36px" className="styles-input" />
                    </div>
                    <div className="styles-body-section">
                      <h4>Color</h4>
                      <div
                        className="styles-color-picker"
                        style={{ zIndex: isBodyColorOpen ? 100 : 1 }}
                      >
                        <button
                          style={{ backgroundColor: bodyColor }}
                          onClick={() => setIsBodyColorOpen((prev) => !prev)}
                        ></button>
                        {isBodyColorOpen && (
                          <BlockPicker
                            className="block-picker"
                            color={bodyColor}
                            onChange={(color) => setBodyColor(color.hex)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <Divider />

                <div className="styles-section">
                  <label className="styles-heading">Panel</label>
                  <div className="styles-body-container">
                    <div className="styles-body-section">
                      <h4>Size</h4>
                      <Input placeholder="36px" className="styles-input" />
                    </div>
                    <div className="styles-body-section">
                      <h4>Color</h4>
                      <div
                        className="styles-color-picker"
                        style={{ zIndex: isPanelColorOpen ? 100 : 1 }}
                      >
                        <button
                          style={{ backgroundColor: panelColor }}
                          onClick={() => setIsPanelColorOpen((prev) => !prev)}
                        ></button>
                        {isPanelColorOpen && (
                          <BlockPicker
                            className="block-picker"
                            color={panelColor}
                            onChange={(color) => setPanelColor(color.hex)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Card;
