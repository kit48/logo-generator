import * as React from 'react';
import {
  Stack,
  TextField,
  ColorPicker,
  getColorFromString,
  DefaultButton,
  Toggle,
  Callout,
  DelayedRender,
  Text,
  Modal,
  TeachingBubble,
  Icon,
  Spinner,
  SpinnerSize,
  Slider,
} from '@fluentui/react';
import { useSize } from 'ahooks';
import html2canvas from 'html2canvas';

import Logo from './components/Logo';

const DEFAULT_NAME = 'KIT';
const DEFAULT_NUMBER = '48';
const DEFAULT_COLOR = '#3178c6';
const TEACHED_LABEL = 'teached';
const LOGO_ID = 'logo';
const PREVIEW_LOGO_ID = 'preview-logo';
const GITHUB_CORNER_CLASS_NAME = 'github-corner';

function Page() {
  const [name, setName] = React.useState(DEFAULT_NAME);
  const [number, setNumber] = React.useState(DEFAULT_NUMBER);
  const [color, setColor] = React.useState(getColorFromString(DEFAULT_COLOR)!);
  const [square, setSquare] = React.useState(false);
  const [borderRadious, setBorderRadious] = React.useState(0);
  const [calloutVisible, setCalloutVisible] = React.useState(false);
  const { width } = useSize(document.getElementsByTagName('body')[0]);
  const [loading, setLoading] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [teachingBubbleVisible, setTeachingBubbleVisible] = React.useState(() => {
    const teached = localStorage.getItem(TEACHED_LABEL);
    return !teached;
  });

  React.useEffect(() => {
    localStorage.setItem(TEACHED_LABEL, '1');
  }, []);

  function handlePreview() {
    setLoading(true);
    setPreviewVisible(true);
    const logoNode = document.getElementById(LOGO_ID)!;

    html2canvas(logoNode, { backgroundColor: null })
      .then(function (canvas) {
        // 直接通过 cavas 下载会有图片显示不完整的 bug
        const previewLogoNode = document.getElementById(PREVIEW_LOGO_ID);
        previewLogoNode?.appendChild(canvas);
        // const link = document.createElement('a');
        // link.download = `${name}${number}.png`;
        // link.href = canvas.toDataURL();
        // link.click();
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleDownload() {
    const previewLogoNode = document.getElementById(PREVIEW_LOGO_ID);
    const canvas = previewLogoNode?.getElementsByTagName('canvas')[0];
    if (canvas) {
      const link = document.createElement('a');
      link.download = `${name}${number}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  }

  const horizontal = !!width && width >= 734;

  return (
    <div
      style={{ width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <div style={{ marginBottom: 80 }}>
        <Stack horizontal={horizontal} verticalAlign='center'>
          <div style={{ width: 360, display: 'flex', justifyContent: 'center' }}>
            <Logo
              key={`${name}${number}`}
              id={LOGO_ID}
              name={name}
              number={number}
              backgroundColor={color.str}
              square={square}
              borderRadious={borderRadious}
              onClick={() => {
                setCalloutVisible(!calloutVisible);
                setTeachingBubbleVisible(false);
              }}
            />
            {calloutVisible && (
              <Callout
                target={`#${LOGO_ID}`}
                onDismiss={() => {
                  setCalloutVisible(false);
                }}
              >
                <DelayedRender>
                  <ColorPicker
                    color={color}
                    onChange={(_, colorObj) => {
                      console.log(colorObj);
                      setColor(colorObj);

                      const githubCornerNode = document.getElementsByClassName(GITHUB_CORNER_CLASS_NAME)[0];
                      githubCornerNode.getElementsByTagName('svg')[0].style.fill = colorObj.str;
                    }}
                  />
                </DelayedRender>
              </Callout>
            )}
            {teachingBubbleVisible && (
              <TeachingBubble
                target={`#${LOGO_ID}`}
                onDismiss={() => {
                  setTeachingBubbleVisible(false);
                }}
                headline='支持调色'
                calloutProps={{
                  directionalHint: 9,
                }}
              >
                点击图标弹出调色面板
              </TeachingBubble>
            )}
          </div>
          <Stack style={{ width: 360, marginLeft: 12 }}>
            <div style={{ height: 248 }}>
              <TextField
                label='Name'
                value={name}
                onChange={(_, newValue) => {
                  setName(newValue!.toUpperCase());
                }}
              />
              <TextField
                label='Number'
                value={`${number}`}
                onChange={(_, newValue) => {
                  setNumber(newValue!);
                }}
              />
              <Toggle
                label='Square'
                checked={square}
                onChange={(_, checked) => {
                  setSquare(!!checked);
                }}
              />
              {square && (
                <DelayedRender>
                  <Slider
                    label='Round Corner'
                    value={borderRadious}
                    onChange={(newValue) => {
                      setBorderRadious(newValue);
                    }}
                    max={48}
                  />
                </DelayedRender>
              )}
            </div>
            <div>
              <DefaultButton
                iconProps={{ iconName: 'Redo' }}
                onClick={() => {
                  setName(DEFAULT_NAME);
                  setNumber(DEFAULT_NUMBER);
                  setColor(getColorFromString(DEFAULT_COLOR)!);
                  setSquare(false);
                }}
                text='重置'
              />
              <DefaultButton
                style={{ marginLeft: 12 }}
                iconProps={{ iconName: 'PictureFill' }}
                disabled={loading || name.length !== 3 || number.length !== 2}
                onClick={handlePreview}
                text='预览'
              />
            </div>
          </Stack>
        </Stack>
        <Stack horizontalAlign='center' style={{ margin: '64px 12px 0' }}>
          <Text variant='large' block>
            温馨提示
          </Text>
          <Text style={{ marginTop: 12, marginBottom: 12 }}>
            为了更好的使用体验，请使用 PC 访问本网站。此外，如果你想实现更炫酷的效果，可以自己定制&nbsp;
            <a href='https://www.runoob.com/css3/css3-tutorial.html' target='_blank' rel='noopener noreferrer'>
              CSS 样式
            </a>
            ，比如
            <a
              href='https://www.runoob.com/css3/css3-gradients.html'
              target='_blank'
              rel='noopener noreferrer'
              onMouseOver={() => {
                document.getElementById(LOGO_ID)!.style.backgroundImage =
                  'linear-gradient(141deg,#9fb8ad 0%,#1fc8db 51%,#2cb5e8 75%)';
              }}
              onMouseLeave={() => {
                document.getElementById(LOGO_ID)!.style.backgroundImage = 'unset';
              }}
            >
              背景渐变
            </a>
            。
          </Text>
          <Text style={{ display: 'flex', alignItems: 'center' }} title='总访问量'>
            <Icon iconName='Trophy' style={{ marginRight: 4 }} />
            <div id='busuanzi_container_page_pv'>
              <div id='busuanzi_value_page_pv'>
                <Spinner size={SpinnerSize.small} />
              </div>
            </div>
          </Text>
        </Stack>
        <Modal
          isOpen={previewVisible}
          onDismiss={() => {
            setPreviewVisible(false);
          }}
          isBlocking={false}
        >
          <Stack horizontalAlign='center'>
            <div
              id={PREVIEW_LOGO_ID}
              style={{
                width: 360,
                height: 330,
                display: 'flex',
                justifyContent: 'center',
                marginTop: 36,
              }}
            >
              {loading && <Spinner size={SpinnerSize.large} />}
            </div>
            <div style={{ margin: '24px 0' }}>
              <DefaultButton
                iconProps={{ iconName: 'Download' }}
                disabled={loading}
                onClick={handleDownload}
                text='下载'
              />
            </div>
          </Stack>
        </Modal>
      </div>
    </div>
  );
}

export default Page;
