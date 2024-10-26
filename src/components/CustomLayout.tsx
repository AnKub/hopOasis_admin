import { Layout, LayoutProps } from 'react-admin';
import CustomAppBar from './CustomAppBar';
import { memo } from 'react';

const CustomLayout = memo((props: LayoutProps) => (
    <Layout {...props} appBar={CustomAppBar} />
));

export default CustomLayout;
