declare module '@ioc:Adonis/Core/Validator' {
    interface Rules {
      notSame(otherField: string): Rule
    }
  }