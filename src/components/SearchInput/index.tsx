import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, InputGroup } from 'react-bootstrap';

interface IProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
}

const SearchInput: React.FC<IProps> = ({value, onChange, onClear}) => {
    return (
        <InputGroup>
            <Form.Control value={value} type="text" placeholder="Enter keyword..." onChange={onChange} />
            <Button variant="outline-secondary" onClick={onClear}>
                <i className="bi bi-x-circle" />
            </Button>
        </InputGroup>
    );
};

export default SearchInput;