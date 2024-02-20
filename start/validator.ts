/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { validator } from '@ioc:Adonis/Core/Validator';

validator.rule('notSame', (value, [otherField], options) => {
    const otherFieldValue = options.root[otherField]    
    if (value === otherFieldValue) {
        options.errorReporter.report(
            options.pointer,
            'notSame',
            'The two fields cannot have the same value',
            options.arrayExpressionPointer
        );
    }
});
