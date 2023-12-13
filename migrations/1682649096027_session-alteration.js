
/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  pgm.addConstraint("session", "session_pkey", {
    primaryKey: "sid",
    deferrable: false,
  });

  pgm.createIndex("session", "expire", { name: "IDX_session_expire" });
};

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropIndex("session", "expire", { name: "IDX_session_expire" });

  pgm.dropConstraint("session", "session_pkey", {
    primaryKey: "sid",
    deferrable: false,
  });
};
