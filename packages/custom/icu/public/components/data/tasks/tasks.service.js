'use strict';

angular.module('mean.icu.data.tasksservice', [])
.service('TasksService', function(ApiUri, $http, ProjectsService) {
    var EntityPrefix = '/tasks';

    function getAll() {
        return $http.get(ApiUri + EntityPrefix).then(function(result) {
            return result.data;
        });
    }

    function getTags() {
        return $http.get(ApiUri + EntityPrefix + '/tags').then(function(result) {
            return result.data;
        });
    }

    function getById(id) {
        return $http.get(ApiUri + EntityPrefix + '/' + id).then(function(result) {
            return result.data;
        });
    }

    function getByUserId(id) {
        return getAll().then(function(result) {
            return _(result).filter(function(task) {
                return task.creator._id === id;
            })
        });
    }

    function getByProjectId(id) {
        return ProjectsService.getById(id).then(function(project) {
            return $http.get(ApiUri + '/projects/' + id + '/tasks').then(function(tasksResult) {
                var tasks = tasksResult.data;

                return tasks.map(function(task) {
                    task.project = project;
                    return task;
                });
            });
        });
    }

    function create(task) {
        return $http.post(ApiUri + EntityPrefix, task).then(function(result) {
            return result.data;
        });
    }

    function update(task) {
        return $http.put(ApiUri + EntityPrefix + '/' + task._id, task).then(function(result) {
            return result.data;
        });
    }

    function remove(id) {
        return $http.delete(ApiUri + EntityPrefix + '/' + id).then(function(result) {
            return result.data;
        });
    }

    return {
        getAll: getAll,
        getTags: getTags,
        getById: getById,
        getByUserId: getByUserId,
        getByProjectId: getByProjectId,
        create: create,
        update: update,
        remove: remove
    };
});
