import { toast } from "react-toastify";
import React from "react";
import Error from "@/components/ui/Error";

const attendanceService = {
  // Initialize ApperClient
  getClient() {
    const { ApperClient } = window.ApperSDK;
    return new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  },

  // Get all attendance records with pagination and filtering
  async getAll(options = {}) {
    try {
      const apperClient = this.getClient();
      const tableName = 'attendance_c';
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "employee_id_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "clock_in_c" } },
          { field: { Name: "clock_out_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } }
        ],
        orderBy: [
          {
            fieldName: "date_c",
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
        console.error("Error fetching attendance:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  // Get attendance by ID
  async getById(id) {
    try {
      const apperClient = this.getClient();
      const tableName = 'attendance_c';
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "employee_id_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "clock_in_c" } },
          { field: { Name: "clock_out_c" } },
          { field: { Name: "status_c" } },
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
      if (error?.response?.data?.message) {
        console.error(`Error fetching attendance with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  // Create new attendance record(s)
  async create(attendanceData) {
    try {
      const apperClient = this.getClient();
      const tableName = 'attendance_c';
      
      // Filter to only include Updateable fields
      const updateableFields = {
        Name: attendanceData.Name,
        Tags: attendanceData.Tags,
        Owner: attendanceData.Owner ? parseInt(attendanceData.Owner) : undefined,
        employee_id_c: attendanceData.employee_id_c ? parseInt(attendanceData.employee_id_c) : undefined,
        date_c: attendanceData.date_c,
        clock_in_c: attendanceData.clock_in_c,
        clock_out_c: attendanceData.clock_out_c,
        status_c: attendanceData.status_c
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
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} attendance records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          toast.success('Attendance record created successfully');
          return successfulRecords[0].data;
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating attendance:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  // Update attendance record(s)
  async update(id, attendanceData) {
    try {
      const apperClient = this.getClient();
      const tableName = 'attendance_c';
      
      // Filter to only include Updateable fields
      const updateableFields = {
        Id: parseInt(id),
        Name: attendanceData.Name,
        Tags: attendanceData.Tags,
        Owner: attendanceData.Owner ? parseInt(attendanceData.Owner) : undefined,
        employee_id_c: attendanceData.employee_id_c ? parseInt(attendanceData.employee_id_c) : undefined,
        date_c: attendanceData.date_c,
        clock_in_c: attendanceData.clock_in_c,
        clock_out_c: attendanceData.clock_out_c,
        status_c: attendanceData.status_c
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
          console.error(`Failed to update ${failedUpdates.length} attendance records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          toast.success('Attendance record updated successfully');
          return successfulUpdates[0].data;
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating attendance:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  // Delete attendance record(s)
  async delete(recordIds) {
    try {
      const apperClient = this.getClient();
      const tableName = 'attendance_c';
      
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
          console.error(`Failed to delete ${failedDeletions.length} attendance records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulDeletions.length > 0) {
          toast.success(`${successfulDeletions.length} attendance record(s) deleted successfully`);
        }
        
        return successfulDeletions.length === integerIds.length;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting attendance:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  },

  // Get attendance by employee
  async getByEmployee(employeeId) {
    try {
      const filterOptions = {
        where: [
          {
            FieldName: "employee_id_c",
            Operator: "EqualTo",
            Values: [parseInt(employeeId)]
          }
        ]
      };
      
      return await this.getAll(filterOptions);
    } catch (error) {
      console.error('Error fetching attendance by employee:', error);
      return [];
    }
  },

  // Get attendance by date range
  async getByDateRange(startDate, endDate) {
    try {
      const filterOptions = {
        where: [
          {
            FieldName: "date_c",
            Operator: "GreaterThanOrEqualTo",
            Values: [startDate]
          },
          {
            FieldName: "date_c",
            Operator: "LessThanOrEqualTo",
            Values: [endDate]
          }
        ]
      };
      
      return await this.getAll(filterOptions);
    } catch (error) {
      console.error('Error fetching attendance by date range:', error);
      return [];
    }
  }
};

export default attendanceService;