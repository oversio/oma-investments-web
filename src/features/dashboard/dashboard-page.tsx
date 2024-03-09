import { useState } from "react";

import { Panel } from "../../common/components/panel/panel";

export function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1>Dashboard page</h1>
      <button onClick={() => setIsOpen(true)}>Open Panel</button>
      <Panel isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1>Panel Content</h1>
      </Panel>
    </div>
  );
}
