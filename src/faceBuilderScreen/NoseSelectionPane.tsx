import InnerContentPane, { ButtonDefinition } from "ui/innerContentPane/InnerContentPane";

type EmptyCallback = () => void;

interface IProps {
  className:string,
  isSpecified:boolean,
  onAdd:EmptyCallback,
  onReplace:EmptyCallback,
  onRemove:EmptyCallback,
  disabled?:boolean
}

function _generateButtonDefinitions(isSpecified:boolean, onAdd:EmptyCallback, onReplace:EmptyCallback, onRemove:EmptyCallback, disabled?:boolean):ButtonDefinition[] {
  return isSpecified
    ? [{text:'Remove', onClick:onRemove, disabled}, {text:'Replace', onClick:onReplace, disabled}]
    : [{text:'Add', onClick:onAdd, disabled}];
}

function NoseSelectionPane(props:IProps) {
  const { className, disabled, isSpecified, onAdd, onRemove, onReplace } = props;

  const buttons:ButtonDefinition[] = _generateButtonDefinitions(isSpecified, onAdd, onReplace, onRemove, disabled);
  const comment = 'Skin colors are inherited from head settings.';

  if (!isSpecified) return <InnerContentPane className={className} buttons={buttons} caption='No Nose' />

  return (
    <InnerContentPane className={className} buttons={buttons} caption='Selected: Nose' comment={comment} />
  );
}

export default NoseSelectionPane;