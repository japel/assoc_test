/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

    var userdata = {
        name: 'test'
    };

    var usergroupdata = {
        name: 'testgroup'
    };

    UserGroups.findOrCreate(usergroupdata, usergroupdata)
        .populateAll()
        .exec(function (error, group) {
            User.findOrCreate(userdata, userdata)
                .populateAll()
                .exec(function (error, user) {
                    user.usergroups.add(group);
                    user.save(function (error, saved_user) {
                        console.log(saved_user);
                        User.findOne(user.id).populateAll().exec(function(err, result){
                            console.log(result);
                        });
                    });
                });
        });

  cb();
};
