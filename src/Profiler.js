export default function onRenderCallback(id, phase, startTime) {
  if (phase === 'update') {
    console.log({ startTime, id, phase });
  }
}
