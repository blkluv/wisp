import InnerContentPane, { ButtonDefinition } from "ui/innerContentPane/InnerContentPane";

type EmptyCallback = () => void;

interface IProps {
  partNo:number,
  className:string,
  isSpecified:boolean,
  onAdd:EmptyCallback,
  onReplace:EmptyCallback,
  onRemove:EmptyCallback
}

function _generateButtonDefinitions(isSpecified:boolean, onAdd:EmptyCallback, onReplace:EmptyCallback, onRemove:EmptyCallback):ButtonDefinition[] {
  return isSpecified
    ? [{text:'Remove', onClick:onRemove}, {text:'Replace', onClick:onReplace}]
    : [{text:'Add', onClick:onAdd}];
}

function ExtraSelectionPane(props:IProps) {
  const { className, isSpecified, onAdd, onRemove, onReplace, partNo } = props;

  const buttons:ButtonDefinition[] = _generateButtonDefinitions(isSpecified, onAdd, onReplace, onRemove);
  
  const comment = 'Extra parts are things like hats and eyeglasses that go on top of faces.';

  if (!isSpecified) return <InnerContentPane className={className} buttons={buttons} caption={`No Extra Part #${partNo}`} comment={comment} />

  return (
    <InnerContentPane className={className} buttons={buttons} caption={`Selected: Extra #${partNo}`} comment={comment}>
    </InnerContentPane>
  );
}

export default ExtraSelectionPane;