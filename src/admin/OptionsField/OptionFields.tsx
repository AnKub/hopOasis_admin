import React from 'react';
import { ArrayInput, SimpleFormIterator, NumberInput} from 'react-admin';

interface OptionsFieldProps {
    optionsSource: string; 
    fields: { key: string; label: string }[]; 
}

const OptionsField: React.FC<OptionsFieldProps> = ({ optionsSource, fields }) => (
    <ArrayInput source={optionsSource}>
        <SimpleFormIterator disableRemove={false}>
            <NumberInput
                source="id"
                label="ID"
                disabled
                defaultValue={0} 
            />
            {fields.map((field) => (
                <NumberInput
                    key={field.key}
                    source={field.key}
                    label={field.label}
                    defaultValue={0}
                    variant="outlined"
                    size="small"
                    className="list-common"
                    step={0.01}
                />
            ))}
        </SimpleFormIterator>
    </ArrayInput>
);

export default OptionsField;
