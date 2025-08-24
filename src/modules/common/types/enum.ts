export enum RoleEnum {
  // Classe
  USER_UPDATE = 'user:update',

  BANK_READ = 'bank:read',
  BANK_CREATE = 'bank:create',
  BANK_UPDATE = 'bank:update',

  CATEGORY_READ = 'category:read',
  CATEGORY_CREATE = 'category:create',
  CATEGORY_UPDATE = 'category:update',

  PRODUCT_READ = 'product:read',
  PRODUCT_CREATE = 'product:create',
  PRODUCT_UPDATE = 'product:update',

  PAPER_READ = 'paper:read',
  PAPER_CREATE = 'paper:create',
  PAPER_UPDATE = 'paper:update',

  INVESTMENT_READ = 'investment:read',
  INVESTMENT_CREATE = 'investment:create',
  INVESTMENT_UPDATE = 'investment:update',

  EXPENSE_READ = 'expense:read',
  EXPENSE_CREATE = 'expense:create',
  EXPENSE_UPDATE = 'expense:update',
  EXPENSE_DELETE = 'expense:delete',

  EXPENSE_CATEGORY_READ = 'expenseCategory:read',
  EXPENSE_CATEGORY_CREATE = 'expenseCategory:create',
  EXPENSE_CATEGORY_UPDATE = 'expenseCategory:update',

  EXPENSE_PRODUCT_READ = 'expenseProduct:read',
  EXPENSE_PRODUCT_CREATE = 'expenseProduct:create',
  EXPENSE_PRODUCT_UPDATE = 'expenseProduct:update',
}
