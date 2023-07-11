import { observer } from "mobx-react-lite";

import React from "react";
import "./CheckboxDropdown.css";

import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";

const CheckboxMenu = React.forwardRef(
  (
    {
      children,
      style,
      className,
      "aria-labelledby": labeledBy,
      onSelectAll,
      onSelectNone
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={style}
        className={`${className} CheckboxMenu`}
        aria-labelledby={labeledBy}
      >
        <div
          className="d-flex flex-column"
          style={{ maxHeight: "calc(100vh)", overflow: "none" }}
        >
          <ul
            className="list-unstyled flex-shrink mb-0"
            style={{ overflow: "auto" }}
          >
            {children}
          </ul>
        </div>
      </div>
    );
  }
);

const CheckDropdownItem = React.forwardRef(
  ({ children, id, checked, onChange }, ref) => {
    return (
      <Form.Group ref={ref} className="dropdown-item mb-0" controlId={id}>
        <Form.Check
          type="checkbox"
          label={children}
          checked={checked}
          onChange={onChange && onChange.bind(onChange, id)}
        />
      </Form.Group>
    );
  }
);

export const CheckboxDropdown = observer(({ items }) => {
  const handleChecked = (key, event) => {
    items.find(i => i.id === key).checked = event.target.checked;
  };

  const handleSelectAll = () => {
    items.forEach(i => (i.checked = true));
  };

  const handleSelectNone = () => {
    items.forEach(i => (i.checked = false));
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className="find_dropdown" variant="primary" id="dropdown-basic">
        Chủ đề chụp
      </Dropdown.Toggle>

      <Dropdown.Menu
        as={CheckboxMenu}
        onSelectAll={handleSelectAll}
        onSelectNone={handleSelectNone}
      >
        {items.map(i => (
          <Dropdown.Item
            key={i.id}
            as={CheckDropdownItem}
            id={i.id}
            checked={i.checked}
            onChange={handleChecked}
          >
            {i.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
});
