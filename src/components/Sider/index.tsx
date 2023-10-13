import { useEffect, useState } from 'react';
import { Layout, Nav } from '@douyinfe/semi-ui';

const { Sider } = Layout;

const SiderBar = (props) => {
  const [navItems, setNavItems] = useState([])
  useEffect(() => {
    const navItems = props.menus
      ?.filter((menu) => !menu.hidden).map((menu) => ({
        itemKey: menu.path,
        text: menu.title,
        icon: menu.icon
      }));
    setNavItems(navItems);
  }, [props.menus]);
  return (
    <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
      <Nav
        style={{ maxWidth: 220, height: '100%' }}
        defaultSelectedKeys={props.defaultSelectedKeys}
        onSelect={(key) => props.onSelect(key)}
        items={navItems}
        footer={{
          collapseButton: true,
        }}
      />
    </Sider>
  );
};

export default SiderBar;
