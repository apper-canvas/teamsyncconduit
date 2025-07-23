import { toast } from "react-toastify";
import React from "react";
import Error from "@/components/ui/Error";

const employeeService = {
  // Initialize ApperClient
getClient() {
    if (!window.ApperSDK) {
      throw new Error('ApperSDK is not loaded. Please check your internet connection and try again.');
    }
    
    const { ApperClient } = window.ApperSDK;
    if (!ApperClient) {
      throw new Error('ApperClient is not available. Please refresh the page and try again.');
    }
    
    return new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  },

  // Get all employees with pagination and filtering
  async getAll(options = {}) {
    try {
      const apperClient = this.getClient();
      const tableName = 'employee_c';
      
const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "first_name_c" } },
          { field: { Name: "last_name_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "role_c" } },
          { field: { Name: "hire_date_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "avatar_c" } },
          { 
            field: { Name: "department_id_c" },
            referenceField: { field: { Name: "Name" } }
          },
          { field: { Name: "checkbox1_c" } },
          { field: { Name: "boolean1_c" } },
          { field: { Name: "boolean2_c" } },
          { field: { Name: "date1_c" } },
          { field: { Name: "decimal1_c" } },
          { field: { Name: "decimal2_c" } },
          { field: { Name: "multilinetext1_c" } },
          { field: { Name: "name11_c" } },
          { field: { Name: "autonumber1_c" } },
          { field: { Name: "autonumber2_c" } },
          { field: { Name: "autonumber3_c" } },
          { field: { Name: "autonumber4_c" } },
          { field: { Name: "autonumber5_c" } },
          { field: { Name: "sample1_c" } },
          { field: { Name: "sample2_c" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } }
        ],
        orderBy: [
          {
            fieldName: "CreatedOn",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: options.limit || 20,
          offset: options.offset || 0
        }
      };

      // Add filtering if provided
      if (options.where) {
        params.where = options.where;
      }

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching employees:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  // Get employee by ID
  async getById(id) {
    try {
      const apperClient = this.getClient();
      const tableName = 'employee_c';
      
const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "first_name_c" } },
          { field: { Name: "last_name_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "role_c" } },
          { field: { Name: "hire_date_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "avatar_c" } },
          { 
            field: { Name: "department_id_c" },
            referenceField: { field: { Name: "Name" } }
          },
          { field: { Name: "checkbox1_c" } },
          { field: { Name: "boolean1_c" } },
          { field: { Name: "boolean2_c" } },
          { field: { Name: "date1_c" } },
          { field: { Name: "decimal1_c" } },
          { field: { Name: "decimal2_c" } },
          { field: { Name: "multilinetext1_c" } },
          { field: { Name: "name11_c" } },
          { field: { Name: "autonumber1_c" } },
          { field: { Name: "autonumber2_c" } },
          { field: { Name: "autonumber3_c" } },
          { field: { Name: "autonumber4_c" } },
          { field: { Name: "autonumber5_c" } },
          { field: { Name: "sample1_c" } },
          { field: { Name: "sample2_c" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } }
        ]
      };
      
const response = await apperClient.getRecordById(tableName, parseInt(id), params);
      
      if (!response || !response.data) {
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching employee by ID:', error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to fetch employee');
      }
      return null;
    }
  },

  // Create new employee(s)
async create(employeeData) {
    try {
      const apperClient = this.getClient();
      const tableName = 'employee_c';
      
      // Filter to only include Updateable fields
      const updateableFields = {
        Name: employeeData.Name,
        Tags: employeeData.Tags,
        Owner: employeeData.Owner ? parseInt(employeeData.Owner) : undefined,
        first_name_c: employeeData.first_name_c,
        last_name_c: employeeData.last_name_c,
        email_c: employeeData.email_c || null,
        phone_c: employeeData.phone_c,
        role_c: employeeData.role_c,
        hire_date_c: employeeData.hire_date_c || null,
        status_c: employeeData.status_c,
        avatar_c: employeeData.avatar_c,
        department_id_c: employeeData.department_id_c ? parseInt(employeeData.department_id_c) : undefined,
        name1_c: employeeData.name1_c || null, // Date type
        name2_c: employeeData.name2_c, // Boolean type
        name3_c: employeeData.name3_c ? parseFloat(employeeData.name3_c) : null, // Currency type
        name4_c: employeeData.name4_c || null, // Date type
        name5_c: employeeData.name5_c || null, // DateTime type
        name6_c: employeeData.name6_c ? parseFloat(employeeData.name6_c) : null, // Decimal type
        name7_c: employeeData.name7_c || null, // Email type
        name8_c: employeeData.name8_c, // MultiPicklist type
        name9_c: employeeData.name9_c, // MultilineText type
        name10_c: employeeData.name10_c, // Phone type
        name11_c: employeeData.name11_c ? parseInt(employeeData.name11_c) : null, // Number type
        name12_c: employeeData.name12_c, // Text type
        name13_c: employeeData.name13_c, // Tag type
        name14_c: employeeData.name14_c, // Text type
        name15_c: employeeData.name15_c ? parseInt(employeeData.name15_c) : null, // Number type
        name16_c: employeeData.name16_c, // Text type
        name17_c: employeeData.name17_c, // MultiPicklist type
        name18_c: employeeData.name18_c, // MultiPicklist type
        name19_c: employeeData.name19_c, // Tag type
        name20_c: employeeData.name20_c, // Phone type
        checkbox1_c: employeeData.checkbox1_c, // Boolean type
        date1_c: employeeData.date1_c || null, // Email type
        boolean1_c: employeeData.boolean1_c || null, // Date type (changed from Boolean)
        boolean2_c: employeeData.boolean2_c, // Boolean type
        decimal1_c: employeeData.decimal1_c ? parseFloat(employeeData.decimal1_c) : null, // Decimal type
        decimal2_c: employeeData.decimal2_c ? parseFloat(employeeData.decimal2_c) : null, // Decimal type
        multilinetext1_c: employeeData.multilinetext1_c, // Text type
        autonumber1_c: employeeData.autonumber1_c || null, // Date type
        autonumber2_c: employeeData.autonumber2_c ? parseInt(employeeData.autonumber2_c) : null, // Number type
        autonumber3_c: employeeData.autonumber3_c ? parseInt(employeeData.autonumber3_c) : null, // Number type
        autonumber4_c: employeeData.autonumber4_c ? parseInt(employeeData.autonumber4_c) : null, // Number type
        autonumber5_c: employeeData.autonumber5_c ? parseInt(employeeData.autonumber5_c) : null, // Number type
        sample1_c: employeeData.sample1_c ? parseInt(employeeData.sample1_c) : null, // Number type
        sample2_c: employeeData.sample2_c ? parseInt(employeeData.sample2_c) : null // Number type
      };
      
      // Remove undefined fields
      Object.keys(updateableFields).forEach(key => {
        if (updateableFields[key] === undefined) {
          delete updateableFields[key];
        }
      });
      
      const params = {
        records: [updateableFields]
      };
      
      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulCreations = response.results.filter(result => result.success);
        const failedCreations = response.results.filter(result => !result.success);
        
        if (failedCreations.length > 0) {
          console.error(`Failed to create ${failedCreations.length} employee records:${JSON.stringify(failedCreations)}`);
          
          failedCreations.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulCreations.length > 0) {
          toast.success('Employee created successfully');
          return successfulCreations[0].data;
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating employee:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  // Update existing employee
  async update(id, employeeData) {
    try {
      const apperClient = this.getClient();
      const tableName = 'employee_c';
      
      // Filter to only include Updateable fields (plus Id for update)
      const updateableFields = {
        Id: parseInt(id),
        Name: employeeData.Name,
        Tags: employeeData.Tags,
        Owner: employeeData.Owner ? parseInt(employeeData.Owner) : undefined,
        first_name_c: employeeData.first_name_c,
        last_name_c: employeeData.last_name_c,
        email_c: employeeData.email_c || null,
        phone_c: employeeData.phone_c,
        role_c: employeeData.role_c,
        hire_date_c: employeeData.hire_date_c || null,
        status_c: employeeData.status_c,
        avatar_c: employeeData.avatar_c,
        department_id_c: employeeData.department_id_c ? parseInt(employeeData.department_id_c) : undefined,
        name1_c: employeeData.name1_c || null, // Date type
        name2_c: employeeData.name2_c, // Boolean type
        name3_c: employeeData.name3_c ? parseFloat(employeeData.name3_c) : null, // Currency type
        name4_c: employeeData.name4_c || null, // Date type
        name5_c: employeeData.name5_c || null, // DateTime type
        name6_c: employeeData.name6_c ? parseFloat(employeeData.name6_c) : null, // Decimal type
        name7_c: employeeData.name7_c || null, // Email type
        name8_c: employeeData.name8_c, // MultiPicklist type
        name9_c: employeeData.name9_c, // MultilineText type
        name10_c: employeeData.name10_c, // Phone type
        name11_c: employeeData.name11_c ? parseInt(employeeData.name11_c) : null, // Number type
        name12_c: employeeData.name12_c, // Text type
        name13_c: employeeData.name13_c, // Tag type
        name14_c: employeeData.name14_c, // Text type
        name15_c: employeeData.name15_c ? parseInt(employeeData.name15_c) : null, // Number type
        name16_c: employeeData.name16_c, // Text type
        name17_c: employeeData.name17_c, // MultiPicklist type
        name18_c: employeeData.name18_c, // MultiPicklist type
        name19_c: employeeData.name19_c, // Tag type
        name20_c: employeeData.name20_c, // Phone type
        checkbox1_c: employeeData.checkbox1_c, // Boolean type
        date1_c: employeeData.date1_c || null, // Email type
        boolean1_c: employeeData.boolean1_c || null, // Date type (changed from Boolean)
        boolean2_c: employeeData.boolean2_c, // Boolean type
        decimal1_c: employeeData.decimal1_c ? parseFloat(employeeData.decimal1_c) : null, // Decimal type
        decimal2_c: employeeData.decimal2_c ? parseFloat(employeeData.decimal2_c) : null, // Decimal type
        multilinetext1_c: employeeData.multilinetext1_c, // Text type
        autonumber1_c: employeeData.autonumber1_c || null, // Date type
        autonumber2_c: employeeData.autonumber2_c ? parseInt(employeeData.autonumber2_c) : null, // Number type
        autonumber3_c: employeeData.autonumber3_c ? parseInt(employeeData.autonumber3_c) : null, // Number type
        autonumber4_c: employeeData.autonumber4_c ? parseInt(employeeData.autonumber4_c) : null, // Number type
        autonumber5_c: employeeData.autonumber5_c ? parseInt(employeeData.autonumber5_c) : null, // Number type
        sample1_c: employeeData.sample1_c ? parseInt(employeeData.sample1_c) : null, // Number type
        sample2_c: employeeData.sample2_c ? parseInt(employeeData.sample2_c) : null // Number type
      };
      
      // Remove undefined fields (except Id)
      Object.keys(updateableFields).forEach(key => {
        if (key !== 'Id' && updateableFields[key] === undefined) {
          delete updateableFields[key];
        }
      });
      
      const params = {
        records: [updateableFields]
      };
      
      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} employee records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          toast.success('Employee updated successfully');
          return successfulUpdates[0].data;
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating employee:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },
  // Delete employee(s)
  async delete(recordIds) {
    try {
      const apperClient = this.getClient();
      const tableName = 'employee_c';
      
      // Ensure recordIds is an array
      const ids = Array.isArray(recordIds) ? recordIds : [recordIds];
      const integerIds = ids.map(id => parseInt(id));
      
      const params = {
        RecordIds: integerIds
      };
      
      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} employee records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulDeletions.length > 0) {
          toast.success(`${successfulDeletions.length} employee(s) deleted successfully`);
        }
        
        return successfulDeletions.length === integerIds.length;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting employee:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  },

  // Search employees
  async search(query) {
    try {
      const searchOptions = {
        where: [
          {
            FieldName: "Name",
            Operator: "Contains",
            Values: [query]
          }
        ]
      };
      
      return await this.getAll(searchOptions);
    } catch (error) {
      console.error('Error searching employees:', error);
      return [];
    }
  },

  // Get employees by department
  async getByDepartment(departmentId) {
    try {
      const filterOptions = {
        where: [
          {
            FieldName: "department_id_c",
            Operator: "EqualTo",
            Values: [parseInt(departmentId)]
          }
        ]
      };
      
      return await this.getAll(filterOptions);
    } catch (error) {
      console.error('Error fetching employees by department:', error);
      return [];
    }
  },

  // Get employees by status
  async getByStatus(status) {
    try {
      const filterOptions = {
        where: [
          {
            FieldName: "status_c",
            Operator: "EqualTo",
            Values: [status]
}
        ]
      };
      
      return await this.getAll(filterOptions);
    } catch (error) {
      console.error('Error fetching employees by status:', error);
      return [];
    }
  }
};

export default employeeService;