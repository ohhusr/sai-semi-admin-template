import { Breadcrumb } from '@douyinfe/semi-ui';
import { RouteProps } from '@douyinfe/semi-ui/lib/es/breadcrumb';

const BreadcrumbBar = (props: {
  routes: Array<RouteProps | string>
}) => {
  return (
    <Breadcrumb
      routes={props.routes}
      style={{
        marginBottom: '24px',
      }}
    />
  );
};

export default BreadcrumbBar;
