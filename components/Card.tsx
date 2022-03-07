import { useState } from "react";
import { Drawer, Input, InputNumber, Divider } from "antd";
import {
  SettingOutlined,
  FormatPainterOutlined,
  EditTwoTone,
  CopyTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import { BlockPicker } from "react-color";

const { TextArea } = Input;

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

type Props = {
  index: number;
  titleInput: string;
  bodyInput: string;
  titleSize: number;
  bodySize: number;
  borderSize: number;
  titleColor: string;
  bodyColor: string;
  panelColor: string;
  duplicateCard?: (card: any) => void;
  deleteCard?: (index: number) => void;
  canDelete: boolean;
};
type TabName = "settings" | "styles";
type TabItem = {
  name: TabName;
  icon: (selected: boolean) => JSX.Element;
};

const Card: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<TabName>("settings");

  const [titleInput, setTitleInput] = useState<string>(props.titleInput);
  const [bodyInput, setBodyInput] = useState<string>(props.bodyInput);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleTabChange = (tab: TabName) => {
    setCurrentTab(tab);
  };

  const [titleSize, setTitleSize] = useState<number>(props.titleSize);
  const [bodySize, setBodySize] = useState<number>(props.bodySize);
  const [borderSize, setBorderSize] = useState<number>(props.borderSize);

  const [titleColor, setTitleColor] = useState<string>(props.titleColor);
  const [isTitleColorOpen, setIsTitleColorOpen] = useState<boolean>(false);
  const [bodyColor, setBodyColor] = useState<string>(props.bodyColor);
  const [isBodyColorOpen, setIsBodyColorOpen] = useState<boolean>(false);
  const [panelColor, setPanelColor] = useState<string>(props.panelColor);
  const [isPanelColorOpen, setIsPanelColorOpen] = useState<boolean>(false);

  const duplicateCard = () => {
    if (props.duplicateCard) {
      props.duplicateCard({
        titleInput,
        bodyInput,
        titleSize,
        bodySize,
        borderSize,
        titleColor,
        bodyColor,
        panelColor,
      });
    }
  };

  const deleteCard = () => {
    if (props.deleteCard && props.canDelete) {
      props.deleteCard(props.index);
    }
  };

  const handleOpenTitleColor = () => {
    if (isTitleColorOpen) {
      setIsTitleColorOpen(false);
    } else {
      setIsBodyColorOpen(false);
      setIsPanelColorOpen(false);
      setIsTitleColorOpen(true);
    }
  };

  const handleOpenBodyColor = () => {
    if (isBodyColorOpen) {
      setIsBodyColorOpen(false);
    } else {
      setIsPanelColorOpen(false);
      setIsTitleColorOpen(false);
      setIsBodyColorOpen(true);
    }
  };

  const handleOpenPanelColor = () => {
    if (isPanelColorOpen) {
      setIsPanelColorOpen(false);
    } else {
      setIsBodyColorOpen(false);
      setIsTitleColorOpen(false);
      setIsPanelColorOpen(true);
    }
  };

  return (
    <>
      <div
        className="card"
        style={{
          backgroundColor: panelColor,
          borderRadius: `${borderSize}px`,
          border: visible ? "1px solid #00A3FF" : "",
        }}
      >
        <div className="card-title-area">
          <div
            className="card-title"
            style={{ color: titleColor, fontSize: `${titleSize}px` }}
          >
            {titleInput ? titleInput : "Custom Title"}
          </div>
          <div className="card-buttons">
            <button onClick={showDrawer}>
              <EditTwoTone className="card-icon" />
            </button>
            <button onClick={duplicateCard}>
              <CopyTwoTone className="card-icon" />
            </button>
            <button onClick={deleteCard}>
              <DeleteTwoTone
                className="card-icon"
                twoToneColor={props.canDelete ? "#00a3ff" : "#e0e0e0"}
              />
            </button>
          </div>
        </div>

        <div className="card-line"></div>

        <div
          className="card-body"
          style={{ color: bodyColor, fontSize: `${bodySize}px` }}
        >
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
          width: 350,
          padding: 0,
        }}
        style={{
          marginTop: 90,
        }}
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
                    <InputNumber<number>
                      placeholder="36px"
                      className="styles-input"
                      value={titleSize}
                      onChange={(value) => setTitleSize(value)}
                      controls={false}
                      formatter={(value) => `${value}px`}
                      parser={(value) => Number(value?.replace("px", ""))}
                      max={100}
                    />
                  </div>
                  <div className="styles-body-section">
                    <h4>Color</h4>
                    <div
                      className="styles-color-picker"
                      style={{ zIndex: isTitleColorOpen ? 100 : 1 }}
                    >
                      <button
                        style={{ backgroundColor: titleColor }}
                        onClick={handleOpenTitleColor}
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
                    <InputNumber<number>
                      placeholder="16px"
                      className="styles-input"
                      value={bodySize}
                      onChange={(value) => setBodySize(value)}
                      controls={false}
                      formatter={(value) => `${value}px`}
                      parser={(value) => Number(value?.replace("px", ""))}
                      max={100}
                    />
                  </div>
                  <div className="styles-body-section">
                    <h4>Color</h4>
                    <div
                      className="styles-color-picker"
                      style={{ zIndex: isBodyColorOpen ? 100 : 1 }}
                    >
                      <button
                        style={{ backgroundColor: bodyColor }}
                        onClick={handleOpenBodyColor}
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
                    <InputNumber<number>
                      placeholder="16px"
                      className="styles-input"
                      value={borderSize}
                      onChange={(value) => setBorderSize(value)}
                      controls={false}
                      formatter={(value) => `${value}px`}
                      parser={(value) => Number(value?.replace("px", ""))}
                      max={100}
                    />
                  </div>
                  <div className="styles-body-section">
                    <h4>Color</h4>
                    <div
                      className="styles-color-picker"
                      style={{ zIndex: isPanelColorOpen ? 100 : 1 }}
                    >
                      <button
                        style={{ backgroundColor: panelColor }}
                        onClick={handleOpenPanelColor}
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
      </Drawer>
    </>
  );
};

export default Card;
