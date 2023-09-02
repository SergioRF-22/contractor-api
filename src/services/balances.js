const deposit = async ({ Profile, Job, Contract }, sequelize, userId, amount) => {
    const transaction = await sequelize.transaction();
    try {
        const [user, totalJobsToPay] = await Promise.all([
            Profile.findByPk(userId),
            Job.sum('price', {
                where: {
                    paid: null,
                },
                include:[ {
                    model: Contract,
                    where: {
                        ClientId: userId,
                    },
                }],
            })
        ]);
        if (!user) {
            throw new Error('User not found');
        }
        if (amount > 0.25 * totalJobsToPay) {
            throw new Error('Amount exceeds limit');
        }
        user.balance += amount;
        await user.save({ transaction });
        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        throw new Error(`Deposit failed because ${err}`);
    }
}

module.exports = {
    deposit
}