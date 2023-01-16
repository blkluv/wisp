import {FaceEventManager, CanvasComponent, AttentionController, BlinkController, Emotion, LidLevel} from "sl-web-face";

let faceEventManager:FaceEventManager|null;
let faceId = -1;
let attentionController:AttentionController|null;
let blinkController:BlinkController|null;

const FACE_NAME = 'PREVIEW_FACE';

export function initFaceEvents(headComponent:CanvasComponent):[faceEventManager:FaceEventManager,faceId:number] {
  faceEventManager = new FaceEventManager();
  faceId = faceEventManager.bindFace(FACE_NAME, headComponent);
  attentionController = new AttentionController(faceEventManager, faceId);
  blinkController = new BlinkController(faceEventManager, faceId);
  blinkController.start();
  attentionController.start();
  return [faceEventManager, faceId];
}

export function setHeadForFaceEvents(headComponent:CanvasComponent) {
  if (faceEventManager) faceEventManager.bindFace(FACE_NAME, headComponent);
}

export function setEmotion(emotion:Emotion) {
  if (!faceEventManager) return;
  faceEventManager.setEmotion(faceId, emotion);
}

export function setLidLevel(lidLevel:LidLevel) {
  if (!faceEventManager) return;
  faceEventManager.setLidLevel(faceId, lidLevel);
}