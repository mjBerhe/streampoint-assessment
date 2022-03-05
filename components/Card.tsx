import { useState } from "react";
import { Drawer } from "antd";
import { SettingOutlined, FormatPainterOutlined } from "@ant-design/icons";

const Card: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="card">
        <div className="card-title-area">
          <div className="card-title">Custom Title</div>
          <div className="card-buttons">
            <button onClick={showDrawer}>Edit</button>
            <button>Copy</button>
            <button>Delete</button>
          </div>
        </div>

        <div className="card-line"></div>

        <div className="card-body">Custom body text</div>
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
            <div>
              <SettingOutlined style={{ fontSize: "20px", color: "#4f4f4f" }} />
            </div>
            <div>
              <FormatPainterOutlined
                style={{ fontSize: "20px", color: "#4f4f4f" }}
              />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Card;
