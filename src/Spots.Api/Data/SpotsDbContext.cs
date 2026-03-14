using Microsoft.EntityFrameworkCore;

namespace Spots.Api.Data.DbContext;

public class SpotsDbContext : Microsoft.EntityFrameworkCore.DbContext
{
    public SpotsDbContext(DbContextOptions<SpotsDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
