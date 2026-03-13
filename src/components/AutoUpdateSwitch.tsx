import { useSettings } from "@/hooks/useSettings";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";

export function AutoUpdateSwitch() {
  const { settings, updateSettings } = useSettings();

  if (!settings) {
    return null;
  }

  useEffect(() => {
    if (settings.enableAutoUpdate) {
      updateSettings({ enableAutoUpdate: false });
    }
  }, [settings.enableAutoUpdate, updateSettings]);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="enable-auto-update"
        checked={false}
        disabled
      />
      <Label htmlFor="enable-auto-update">Auto-update (disabled)</Label>
    </div>
  );
}
