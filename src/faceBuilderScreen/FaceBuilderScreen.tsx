import styles from './FaceBuilderScreen.module.css';
import Canvas from "ui/Canvas";
import EmotionSelector from "faceBuilderScreen/EmotionSelector";
import ExtraSelectionPane  from "faceBuilderScreen/ExtraSelectionPane";
import HeadSelectionPane from "faceBuilderScreen/HeadSelectionPane";
import EyesSelectionPane from "faceBuilderScreen/EyesSelectionPane";
import LidLevelSelector from "faceBuilderScreen/LidLevelSelector";
import MouthSelectionPane from "faceBuilderScreen/MouthSelectionPane";
import PartSelector, {PartType} from "faceBuilderScreen/PartSelector";
import TestVoiceSelector, {TestVoiceType} from "faceBuilderScreen/TestVoiceSelector";
import ScreenContainer from 'ui/screen/ScreenContainer';
import Screen from 'ui/screen/screens';
import InnerContentPane from "ui/innerContentPane/InnerContentPane";

import React, {useEffect, useState} from 'react';
import {AttentionController, BlinkController, CanvasComponent, loadFaceFromUrl} from "sl-web-face";

let head:CanvasComponent|null = null;
let isInitialized = false;
const blinkController = new BlinkController();
const attentionController = new AttentionController();

async function _init():Promise<void> {
  head = await loadFaceFromUrl('/faces/billy.yml');
  head.offsetX = 50;
  head.offsetY = 30;
  blinkController.start();
  attentionController.start();
}

function _onDrawCanvas(context:CanvasRenderingContext2D) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  if (!isInitialized || !head) return;
  head.renderWithChildren(context);
}

function _onTestVoiceChange(testVoice:TestVoiceType, setTestVoice:any) {
  setTestVoice(testVoice);
}

function _onPartTypeChange(partType:PartType, setPartType:any) {
  setPartType(partType);
}

function FaceBuilderScreen() {
  const [testVoice, setTestVoice] = useState<TestVoiceType>(TestVoiceType.MUTED);
  const [partType, setPartType] = useState<PartType>(PartType.HEAD);
  
  useEffect(() => {
    if (isInitialized) return;
    _init()
      .then(() => isInitialized = true);
  }, []);
  
  let selectionPane:JSX.Element|null = null;
  switch(partType) {
    case PartType.HEAD:
      selectionPane = <HeadSelectionPane className={styles.selectionPane} onReplace={() => {}} />
      break;
    case PartType.EYES:
      selectionPane = <EyesSelectionPane className={styles.selectionPane} onAdd={() => {}} onReplace={() => {}} onRemove={() => {}} isSpecified={true} />
      break;
    case PartType.MOUTH:
      selectionPane = <MouthSelectionPane className={styles.selectionPane} onAdd={() => {}} onReplace={() => {}} onRemove={() => {}} isSpecified={true} />
      break;
    default:
      selectionPane = <ExtraSelectionPane partNo={1} className={styles.selectionPane} onAdd={() => {}} onReplace={() => {}} onRemove={() => {}} isSpecified={false} />
      break;
  }
  
  return (
    <ScreenContainer isControlPaneOpen={true} activeScreen={Screen.FACES}>
      <div className={styles.container}>
        <InnerContentPane className={styles.facePane} caption='Face'>
          <PartSelector partType={partType} onChange={(nextPartType) => _onPartTypeChange(nextPartType, setPartType)} extraCount={0} />
          <Canvas className={styles.canvas} isAnimated={true} onDraw={_onDrawCanvas} />
        </InnerContentPane>
        <div className={styles.rightColumn}>
          <InnerContentPane className={styles.viewPane} caption='View'>
            <EmotionSelector />
            <LidLevelSelector />
            <TestVoiceSelector testVoiceType={testVoice} onChange={(nextTestVoice) => _onTestVoiceChange(nextTestVoice, setTestVoice)} />
          </InnerContentPane>
          {selectionPane}
        </div>
      </div>
    </ScreenContainer>
  );
}

export default FaceBuilderScreen;