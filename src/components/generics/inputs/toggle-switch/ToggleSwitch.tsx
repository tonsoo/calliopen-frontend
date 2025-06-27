import type DefaultProps from "../../../../traits/DefaultProps";
import './ToggleSwitch.scss';

interface ToggleSwitchProps extends DefaultProps {
  title: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function ToggleSwitch({
  title, value = false, onChange
} : ToggleSwitchProps) {
  return (
    <div className="app-toggle-switch">
      <p className="title">{title}</p>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={"track " + (value ? 'active' : 'deactive')}
      >
        <div className="thumb"></div>
      </button>
    </div>
  );
};