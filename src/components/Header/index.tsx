import { useEffect, useState } from 'react';
import { IconBell, IconHelpCircle, IconSemiLogo } from '@douyinfe/semi-icons';
import { IconDarkMode } from '@douyinfe/semi-icons-lab';
import { Avatar, Button, Layout, Nav, Dropdown } from '@douyinfe/semi-ui';

const { Header } = Layout;

const HeaderBar = (props) => {
  const switchMode = () => {
    const body = document.body;
    if (body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode');
    } else {
      body.setAttribute('theme-mode', 'dark');
    }
  };

  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    const navItems = props.menus
      ?.filter((menu) => !menu.hidden && menu.path === '*')[0]
      .children?.map((menu) => ({
        itemKey: menu.path,
        text: menu.title,
        icon: menu.icon,
      }));
    setNavItems(navItems);
  }, [props.menus]);

  return (
    <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
      <div>
        <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
          <div>
            <Nav
              mode="horizontal"
              defaultSelectedKeys={props.defaultSelectedKeys}
              onSelect={(key) => props.onSelect(key)}
              items={navItems}
              header={{
                logo: <IconSemiLogo style={{ height: '36px', fontSize: 36 }} />,
                text: 'Semi',
              }}
              footer={
                <>
                  <Button
                    theme="borderless"
                    icon={
                      <IconDarkMode className="w-[20px] h-[20px] relative" />
                    }
                    onClick={switchMode}
                  />
                  {/* <Button
                    theme="borderless"
                    icon={<IconBell size="large" />}
                    style={{
                      color: 'var(--semi-color-text-2)',
                      marginRight: '12px',
                    }}
                  />
                  <Button
                    theme="borderless"
                    icon={<IconHelpCircle size="large" />}
                    style={{
                      color: 'var(--semi-color-text-2)',
                      marginRight: '12px',
                    }}
                  /> */}
                  <Dropdown
                    position="bottomRight"
                    render={
                      <Dropdown.Menu>
                        <Dropdown.Item>详情</Dropdown.Item>
                        <Dropdown.Item>退出</Dropdown.Item>
                      </Dropdown.Menu>
                    }
                  >
                    <Avatar
                      size="small"
                      color="light-blue"
                      style={{ margin: 4 }}
                    >
                      BD
                    </Avatar>
                    <span>Bytedancer</span>
                  </Dropdown>
                </>
              }
            ></Nav>
          </div>
        </Header>
      </div>
    </Header>
  );
};

export default HeaderBar;
