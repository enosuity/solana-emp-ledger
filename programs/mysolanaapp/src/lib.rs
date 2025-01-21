use anchor_lang::prelude::*;

declare_id!("6PMijRajWR4SCmtscLSefMV2AqLx2JV5ii5xa7GQBkL1");

#[program]
mod mysolanaapp {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, salary: u64) -> Result<()> {
        let new_account = &mut ctx.accounts.new_account;
        new_account.salary = salary;
        new_account.authority = *ctx.accounts.signer.key;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = 8 + 8 + 32)] // Adjust space as needed
    pub new_account: Account<'info, SalaryAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct SalaryAccount {
    pub salary: u64,
    pub authority: Pubkey,
}
