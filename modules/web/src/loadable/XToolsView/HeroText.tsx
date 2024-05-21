import { Title, Text, Button, Container } from '@mantine/core';
import { Dots } from './Dots';
import classes from './HeroText.module.css';
import AlertUtils from '@/utils/AlertUtils';
import GetAppInfo from '@/AppInfo';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

export function HeroText() {
    const history = useHistory()
    return (
        <Container className={classes.wrapper} size={1400}>
            <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
            <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
            <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
            <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

            <div className={classes.inner}>
                <Title className={classes.title}>
                    一款能让你效率{' '}
                    <Text component="span" className={classes.highlight} inherit>
                        脱颖而出
                    </Text>{' '}
                    的开源工具箱
                </Title>

                <Container p={0} size={600}>
                    <Text size="lg" c="dimmed" className={classes.description}>
                        本站致力于提供全方位的工具和文档资源，基于AI智能分析的加持，让你的生活工作更加便捷，再也不需要在收藏夹里面四处寻找，一站式搞定！
                    </Text>
                </Container>

                <div className={classes.controls}>
                    <Button onClick={() => {
                        AlertUtils.alertInfo("抱歉，桌面端暂未开放下载，敬请期待！感兴趣可加QQ群" + GetAppInfo().qqGroup)
                    }} className={classes.control} size="lg" variant="default" color="gray">
                        下载桌面版
                    </Button>
                    <Button
                        onClick={() => {
                            // AlertUtils.alertInfo("抱歉，专业版暂未开放，敬请期待！感兴趣可加QQ群" + GetAppInfo().qqGroup)
                            history.push("/settings/faq")
                            AlertUtils.alertInfo("抱歉，更多功能页暂不可能，暂时为您跳转到常见问题页")
                        }}
                        className={classes.control} size="lg">
                        了解更多功能
                    </Button>
                </div>
            </div>
        </Container>
    );
}