/*
Navicat MySQL Data Transfer

Source Server         : windows-mysql
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : ming-lie

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2019-01-20 16:35:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for dictionary
-- ----------------------------
DROP TABLE IF EXISTS `dictionary`;
CREATE TABLE `dictionary` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增主键ID',
  `parent_id` bigint(20) DEFAULT NULL COMMENT '上级资源ID',
  `code` varchar(200) DEFAULT NULL COMMENT '编码',
  `name` varchar(200) DEFAULT NULL COMMENT '字典名称',
  `sort_num` bigint(20) DEFAULT NULL COMMENT '排序',
  `icon` varchar(200) DEFAULT '' COMMENT '图标',
  `gmt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `create_user_id` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modify_user_id` bigint(20) DEFAULT NULL COMMENT '修改人',
  `deleted` smallint(6) DEFAULT NULL COMMENT '删除状态 0 正常 1 删除 默认0',
  `status` smallint(6) DEFAULT NULL COMMENT '状态表 0 正常 1 禁用   默认0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8 COMMENT='(字典表)';

-- ----------------------------
-- Records of dictionary
-- ----------------------------

-- ----------------------------
-- Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `realname` varchar(200) DEFAULT NULL COMMENT '真实姓名',
  `username` varchar(200) NOT NULL COMMENT '账户名',
  `password` varchar(200) NOT NULL COMMENT '密码',
  `status` smallint(6) NOT NULL DEFAULT '0' COMMENT '状态表 0 正常 1 禁用   默认0',
  `deleted` smallint(6) NOT NULL DEFAULT '0' COMMENT '删除状态 0 正常 1 删除 默认0',
  `create_user_id` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modify_user_id` bigint(20) DEFAULT NULL COMMENT '修改人',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of employee
-- ----------------------------
INSERT INTO `employee` VALUES ('1', '张三', 'zs', '123456', '0', '0', null, null, '2019-01-19 16:10:14', '2019-01-19 16:10:14');

-- ----------------------------
-- Table structure for emp_role
-- ----------------------------
DROP TABLE IF EXISTS `emp_role`;
CREATE TABLE `emp_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增主键ID',
  `emp_id` bigint(20) DEFAULT NULL COMMENT '员工id',
  `‘role_id’` bigint(20) DEFAULT NULL COMMENT '角色id',
  `gmt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `create_user_id` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modify_user_id` bigint(20) DEFAULT NULL COMMENT '修改人',
  `deleted` smallint(6) DEFAULT NULL COMMENT '删除状态 0 正常 1 删除 默认0',
  `status` smallint(6) DEFAULT NULL COMMENT '状态表 0 正常 1 禁用   默认0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=218 DEFAULT CHARSET=utf8 COMMENT='(用户角色关系表)';

-- ----------------------------
-- Records of emp_role
-- ----------------------------

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增主键ID',
  `parent_id` bigint(20) DEFAULT NULL COMMENT '上级资源ID',
  `keyword` varchar(200) DEFAULT NULL COMMENT '权限',
  `longcode` varchar(200) DEFAULT '' COMMENT '资源编码',
  `name` varchar(200) DEFAULT NULL COMMENT '资源名称',
  `res_url` varchar(200) DEFAULT NULL COMMENT '资源页url',
  `page_url` varchar(200) DEFAULT NULL COMMENT '页面路由',
  `res_type` varchar(200) DEFAULT NULL COMMENT '资源类型model,menu,function',
  `leaf` smallint(6) DEFAULT '0' COMMENT '是否叶子节点  1:是 0:否',
  `sort_num` bigint(20) DEFAULT NULL COMMENT '资源排序',
  `icon` varchar(200) DEFAULT '' COMMENT '图标',
  `gmt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `create_user_id` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modify_user_id` bigint(20) DEFAULT NULL COMMENT '修改人',
  `deleted` smallint(6) DEFAULT NULL COMMENT '删除状态 0 正常 1 删除 默认0',
  `status` smallint(6) DEFAULT NULL COMMENT '状态表 0 正常 1 禁用   默认0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=156 DEFAULT CHARSET=utf8 COMMENT='(资源表)';

-- ----------------------------
-- Records of resource
-- ----------------------------
INSERT INTO `resource` VALUES ('148', '-1', '', '/000001', '系统管理', null, null, null, '0', null, '', '2019-01-20 16:29:31', '0000-00-00 00:00:00', null, null, null, null);
INSERT INTO `resource` VALUES ('149', '-1', '', '/000002', '知识管理', null, null, null, '0', null, '', '2019-01-20 16:29:39', '0000-00-00 00:00:00', null, null, null, null);
INSERT INTO `resource` VALUES ('150', '148', '', '/000001/000001', '员工管理', null, null, null, '0', null, '', '2019-01-20 16:29:57', '0000-00-00 00:00:00', null, null, null, null);
INSERT INTO `resource` VALUES ('151', '150', '', '/000001/000001/000001', '添加员工', null, null, null, '0', null, '', '2019-01-20 16:30:27', '0000-00-00 00:00:00', null, null, null, null);
INSERT INTO `resource` VALUES ('152', '150', '', '/000001/000001/000002', '删除员工', null, null, null, '0', null, '', '2019-01-20 16:30:34', '0000-00-00 00:00:00', null, null, null, null);
INSERT INTO `resource` VALUES ('153', '148', '', '/000001/000002', '角色管理', null, null, null, '0', null, '', '2019-01-20 16:31:28', '0000-00-00 00:00:00', null, null, null, null);
INSERT INTO `resource` VALUES ('154', '153', '', '/000001/000002/000001', '添加角色', null, null, null, '0', null, '', '2019-01-20 16:31:40', '0000-00-00 00:00:00', null, null, null, null);
INSERT INTO `resource` VALUES ('155', '153', '', '/000001/000002/000002', '删除角色', null, null, null, '0', null, '', '2019-01-20 16:31:48', '0000-00-00 00:00:00', null, null, null, null);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增主键ID',
  `role_code` varchar(200) DEFAULT NULL COMMENT '角色编码 ',
  `role_name` varchar(200) DEFAULT NULL COMMENT '角色名称',
  `sort_num` bigint(20) DEFAULT '0' COMMENT '角色排序',
  `descriper` varchar(200) DEFAULT NULL COMMENT '备注',
  `gmt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `create_user_id` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modify_user_id` bigint(20) DEFAULT NULL COMMENT '修改人',
  `deleted` smallint(6) DEFAULT NULL COMMENT '删除状态 0 正常 1 删除 默认0',
  `status` smallint(6) DEFAULT NULL COMMENT '状态表 0 正常 1 禁用   默认0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8 COMMENT='(角色表)';

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', 'root', '超级管理员', '0', 'sad', '2019-01-19 19:37:07', '0000-00-00 00:00:00', null, null, null, null);

-- ----------------------------
-- Table structure for role_resource
-- ----------------------------
DROP TABLE IF EXISTS `role_resource`;
CREATE TABLE `role_resource` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增主键ID',
  `role_id` varchar(200) DEFAULT NULL COMMENT '角色id ',
  `res_id` varchar(200) DEFAULT NULL COMMENT '资源id',
  `gmt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `gmt_modified` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '修改时间',
  `create_user_id` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modify_user_id` bigint(20) DEFAULT NULL COMMENT '修改人',
  `deleted` smallint(6) DEFAULT NULL COMMENT '删除状态 0 正常 1 删除 默认0',
  `status` smallint(6) DEFAULT NULL COMMENT '状态表 0 正常 1 禁用   默认0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=178 DEFAULT CHARSET=utf8 COMMENT='(角色资源关系表)';

-- ----------------------------
-- Records of role_resource
-- ----------------------------

-- ----------------------------
-- Procedure structure for p
-- ----------------------------
DROP PROCEDURE IF EXISTS `p`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `p`()
BEGIN
          
        select * from resource where parent_id = 149;
    
 END
;;
DELIMITER ;
